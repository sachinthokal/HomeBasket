// auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.Service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
  const token = this.auth.getAccessToken();
  const tokenExpiry = this.auth.getTokenExpiry(); // e.g., return timestamp

  if (token && (!tokenExpiry || new Date(tokenExpiry) > new Date())) {
    return true;
  }

  // Token missing or expired
  this.auth.logout(); // clear localStorage or sessionStorage
  this.router.navigate(['/login'], { replaceUrl: true });
  return false;
}

}
