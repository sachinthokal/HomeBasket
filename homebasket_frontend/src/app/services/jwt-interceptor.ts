import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
    private isRefreshing = false;

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getAccessToken();

    let authReq = req;
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // If token expired
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.getRefreshToken().pipe(
            switchMap((newToken: any) => {
              this.isRefreshing = false;
              if (newToken && newToken.access) {
                this.auth.saveAccessToken(newToken.access);
                // Retry request with new token
                return next.handle(
                  req.clone({ setHeaders: { Authorization: `Bearer ${newToken.access}` } })
                );
              }
              return throwError(() => error);
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.auth.logout();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
