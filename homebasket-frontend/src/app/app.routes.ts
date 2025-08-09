import { Routes } from '@angular/router';
//import { DashboardComponent } from './pages/dashboard/dashboard';
import { ViewList } from './pages/view-list/view-list';
import { DashboardComponent } from './pages/dashboard/dashboard';


export const routes: Routes = [
  { path: '', redirectTo: 'viewlist', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'viewlist', component: ViewList },
];
