import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  isLoggedIn = false;

  canActivate(): boolean {
    const token = this.auth.getAccessToken();
    if (token) {           // null check included
      return true;
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }

  onLoggedIn(status: boolean) {
    this.isLoggedIn = status;
    console.log("AppComponent: User logged in", status);
  }
}
