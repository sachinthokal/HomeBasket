import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Category } from './pages/category/category';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'category', component: Category },
];
