import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export type KpiTrend = 'up' | 'down' | 'neutral';

export interface DashboardKpi {
  key: string;
  label: string;
  value: number;
  unit?: string;
  changeLabel?: string;
  trend?: KpiTrend;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = `${environment.apiBaseUrl}/dashboard/kpis`;

  constructor(private readonly http: HttpClient) {}

  getKpis(): Observable<DashboardKpi[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => this.normalizeKpis(response)),
      catchError(() => of([]))
    );
  }

  private normalizeKpis(response: unknown): DashboardKpi[] {
    if (Array.isArray(response)) {
      return response
        .map((item, index) => {
          if (!this.isRecord(item)) {
            return null;
          }

          const label = this.toString(item['label']) || `KPI ${index + 1}`;
          return {
            key: this.toString(item['key']) || label.toLowerCase().replace(/\s+/g, '-'),
            label,
            value: this.toNumber(item['value']),
            unit: this.toOptionalString(item['unit']),
            changeLabel: this.toOptionalString(item['changeLabel']),
            trend: this.toTrend(item['trend'])
          } as DashboardKpi;
        })
        .filter((item): item is DashboardKpi => item !== null);
    }

    if (this.isRecord(response)) {
      const activeVehicles = this.toNumber(response['activeVehicles']);
      const pendingDocuments = this.toNumber(response['pendingDocuments']);
      const maintenanceDue = this.toNumber(response['maintenanceDue']);
      const incidentsOpen = this.toNumber(response['incidentsOpen']);

      const hasKnownShape = ['activeVehicles', 'pendingDocuments', 'maintenanceDue', 'incidentsOpen'].some((key) => key in response);
      if (hasKnownShape) {
        return [
          {
            key: 'active-vehicles',
            label: 'Active Vehicles',
            value: activeVehicles,
            trend: 'up'
          },
          {
            key: 'pending-documents',
            label: 'Pending Documents',
            value: pendingDocuments,
            trend: pendingDocuments > 0 ? 'down' : 'neutral'
          },
          {
            key: 'maintenance-due',
            label: 'Maintenance Due',
            value: maintenanceDue,
            trend: maintenanceDue > 0 ? 'down' : 'neutral'
          },
          {
            key: 'open-incidents',
            label: 'Open Incidents',
            value: incidentsOpen,
            trend: incidentsOpen > 0 ? 'down' : 'neutral'
          }
        ];
      }
    }

    return [];
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private toNumber(value: unknown): number {
    const parsed = typeof value === 'number' ? value : Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private toString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private toOptionalString(value: unknown): string | undefined {
    const cast = this.toString(value).trim();
    return cast.length > 0 ? cast : undefined;
  }

  private toTrend(value: unknown): KpiTrend | undefined {
    if (value === 'up' || value === 'down' || value === 'neutral') {
      return value;
    }

    return undefined;
  }
}
