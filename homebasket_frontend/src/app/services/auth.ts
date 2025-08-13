import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  saveAccessToken(access: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(data: any): Observable<any> {
    console.log(data)
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
  const refresh = this.getRefreshToken();
  if (!refresh) {
    throw new Error('No refresh token found');
  }
  return this.http.post(`${this.baseUrl}/token/refresh/`, { refresh });
}


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile/`);
  }
}
