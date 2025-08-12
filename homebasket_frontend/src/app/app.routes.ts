import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Category } from './pages/category/category';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'category', component: Category },
];
