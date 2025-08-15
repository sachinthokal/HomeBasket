import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {

    const token = localStorage.getItem('access_token');
    if (token) this.fetchUsername(); // on app load

  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      first_name: userData.first_name,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login/`, { username, password })
      .pipe(
        tap(res => {
          // Store JWT tokens
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);

          // Optional: decode token to get username, or call backend
          this.fetchUsername(); // Update header/UI after login
        })
      );
  }

logout(): void {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  if (access) {
    try {
      const decoded: any = jwtDecode(access);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        console.warn('Access token expired. Logging out...');
      }
    } catch (err) {
      console.error('Invalid token format', err);
    }
  }

  if (refresh) {
    this.http.post(`${this.baseUrl}/logout/`, { refresh }).subscribe({
      error: (err) => console.error('Logout API error:', err)
    });
  }

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  this.currentUserSubject.next(null);
  this.router.navigate(['/login']);
}


  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token'); // JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/profile/`, { headers });
  }

  private fetchUsername() {
    this.http.get<any>(`${this.baseUrl}/profile/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    }).subscribe({
      next: (res) => {
        // prefer first_name, fallback to username
        const name = res.first_name?.trim() ? res.first_name : res.username;
        this.currentUserSubject.next(name);
      },
      error: () => this.currentUserSubject.next(null),
    });
  }
}