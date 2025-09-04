import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;


  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {

    const token = localStorage.getItem('access_token');
    if (token) this.fetchUsername(); // on app load

  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}accounts/auth/register/`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      first_name: userData.first_name,
      whatsapp_number: userData.whatsapp_number,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}accounts/auth/login/`, { username, password })
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
    // tokens delete कर
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    console.log("❌ Tokens deleted");

    // redirect force कर
    this.router.navigate(['/login']).then(() => {
      console.log("✅ Redirected to login");
      window.location.reload();  // force reload for Angular state reset
    });
  }

// Get the access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get token expiry timestamp (in milliseconds)
  getTokenExpiry(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      // JWT tokens are in format: header.payload.signature
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // 'exp' is in seconds → convert to milliseconds
      if (payload.exp) {
        return payload.exp * 1000;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }
 

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token'); // JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}accounts/auth/profile/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Unauthorized! Token missing or expired.');
          // 👉 इथे tu login page ला redirect karu shakto
          // this.router.navigate(['/login']);
        } else {
          console.error('Error:', error);
        }
        return throwError(() => error);
      })
    );;
  }

  private fetchUsername() {
    this.http.get<any>(`${this.baseUrl}accounts/auth/profile/`, {
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