import { Routes } from '@angular/router';

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/add-vehicle/add-vehicule').then((c) => c.AddVehicule)
  }
];
