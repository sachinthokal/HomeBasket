import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.Service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Token expiry check
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000; // सेकंदात

        if (decoded.exp && decoded.exp < now) {
          console.warn('Token expired, logging out...');
          this.authService.logout(); // token delete + redirect
          return throwError(() => new Error('Token expired'));
        }

        // Valid token असल्यास request मध्ये add कर
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });

      } catch (err) {
        console.error('Invalid token format', err);
        this.authService.logout();
        return throwError(() => new Error('Invalid token'));
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // API 401 → logout
        if (error.status === 401) {
          console.warn('Unauthorized, logging out...');
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
