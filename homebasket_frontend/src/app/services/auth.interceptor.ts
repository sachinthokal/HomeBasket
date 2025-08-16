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
    let token = localStorage.getItem('access_token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          console.warn('⏰ Token expired');
          this.authService.logout();
          return throwError(() => new Error('Token expired'));
        }

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
        if (error.status === 401) {
          console.warn('🚫 Unauthorized → force logout');
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
