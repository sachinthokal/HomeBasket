import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  saveAccessToken(access: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl;
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));
isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(data: any): Observable<any> {
     this._isLoggedIn.next(true);
    return this.http.post(`${this.baseUrl}/login/`, data);
  }

  setTokens(access: string, refresh: string) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refreshToken');

    if (!refresh) {
      // Clear any remaining tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Redirect to login page
      this.router.navigate(['/login']);
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http.post(`${this.baseUrl}/token/refresh/`, { refresh });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._isLoggedIn.next(false);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile/`);
  }

  
}
