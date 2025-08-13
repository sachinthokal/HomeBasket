import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Category } from './pages/category/category';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  { path: 'category', component: Category, canActivate: [AuthGuard]},
];
