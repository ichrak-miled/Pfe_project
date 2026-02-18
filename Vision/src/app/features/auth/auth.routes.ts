import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/sign-in/auth-signin.component').then((c) => c.AuthSigninComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/sign-up/auth-signup.component').then((c) => c.AuthSignupComponent)
  }
];
