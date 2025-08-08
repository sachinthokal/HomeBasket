import { Routes } from '@angular/router';
import { Login} from './pages/login/login';
import { Home } from './pages/home/home';
import { ViewList } from './pages/view-list/view-list';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'view-list', component: ViewList},
    { path: 'dashboard', component: Dashboard },
    { path: '**', component: NotFound } // 404 page

];
