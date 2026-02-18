import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiculeCreatedResponse } from './vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private readonly apiUrl = `${environment.apiBaseUrl}/vehicules/save`;

  constructor(private http: HttpClient) {}

  addVehicule(formData: FormData): Observable<VehiculeCreatedResponse> {
    return this.http.post<VehiculeCreatedResponse>(this.apiUrl, formData);
  }
}
