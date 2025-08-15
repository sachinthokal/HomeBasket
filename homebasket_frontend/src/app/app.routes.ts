import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Category } from './pages/category/category';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: Login},
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'category', component: Category, canActivate: [AuthGuard]},
  { path: 'not-found', component: NotFound, canActivate: [AuthGuard]},
  { path: 'history', component: Category, canActivate: [AuthGuard]},
  { path: 'payments', component: Category, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/not-found' }, // wildcard / 404 fallback

];
