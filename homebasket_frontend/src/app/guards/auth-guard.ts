import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
  const token = this.auth.getAccessToken();
  if (token) {           // null check included
    return true;
  } else {
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
}
}
