import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = { username: '', email: '', password: '' };
  credentials = { email: '', password: '' };
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  onSignup() {
    this.error = null;
    this.auth.register(this.user).subscribe({
      next: (res: any) => {
        alert(res.message || 'Registered successfully');
        this.router.navigate(['/signin']);
      },
      error: err => {
        // show first error message
        if (err.error) {
          if (err.error.email) this.error = err.error.email[0];
          else if (err.error.username) this.error = err.error.username[0];
          else this.error = JSON.stringify(err.error);
        } else {
          this.error = 'Server error';
        }
      }
    });
  }


  onSignin() {
    this.error = null;
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        // store tokens
        this.auth.setTokens(res.access, res.refresh);
        // optional: store user in local storage
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']); // homepage or dashboard
      },
      error: err => {
        this.error = err?.error?.error || 'Invalid credentials';
      }
    });
  }
}
