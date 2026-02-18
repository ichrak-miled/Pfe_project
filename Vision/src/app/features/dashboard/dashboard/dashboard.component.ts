import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { DashboardKpi, DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dashboardFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('220ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1 }))
      ])
    ]),
    trigger('cardStagger', [
      transition(':enter', [
        query(
          '.kpi-card, .dashboard-empty-state',
          [
            style({ opacity: 0, transform: 'translateY(8px)' }),
            stagger(60, animate('260ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' })))
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  kpis: DashboardKpi[] = [];
  isLoading = true;
  lastUpdatedAt: Date | null = null;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getKpis()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((kpis) => {
        this.kpis = kpis;
        this.lastUpdatedAt = new Date();
      });
  }

  hasData(): boolean {
    return this.kpis.length > 0;
  }

  trackKpi(_: number, item: DashboardKpi): string {
    return item.key;
  }

  trendClass(kpi: DashboardKpi): string {
    if (kpi.trend === 'up') {
      return 'kpi-card__trend--up';
    }

    if (kpi.trend === 'down') {
      return 'kpi-card__trend--down';
    }

    return 'kpi-card__trend--neutral';
  }
}
