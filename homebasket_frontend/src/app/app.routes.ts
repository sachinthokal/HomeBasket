import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Category } from './pages/category/category';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';
import { NotFound } from './pages/not-found/not-found';
import { History } from './pages/history/history';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: Login},
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'category', component: Category, canActivate: [AuthGuard]},
  { path: 'history', component: History, canActivate: [AuthGuard]},
  { path: 'reports', component: Reports, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/not-found' }, // wildcard / 404 fallback
  { path: 'not-found', component: NotFound},

];
