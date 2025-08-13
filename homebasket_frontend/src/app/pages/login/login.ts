import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = { first_name: '', username: '', email: '', password: '' };
  credentials = { first_name: '', email: '', password: '' };
  error: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSignup() {
    this.error = '';
    // console.log(this.user)
    this.auth.register(this.user).subscribe({
      next: (res: any) => {
        alert(res.message || 'Registered successfully');
        this.user = { first_name: '', username: '', email: '', password: '' }
        this.router.navigate(['/login']);
      },
      error: err => {
        // show first error message
        if (err.error) {
          if (err.error.email) this.error = err.error.email[0];
          else if (err.error.username) this.error = err.error.username[0];
          else if (err.error.password) this.error = "Password : " + err.error.password[0];
          else this.error = typeof err.error === 'string' ? err.error : 'Something went wrong';
        } else {
          this.error = 'Server error';
        }
      }
    });
  }
  onLoginload() {
    this.error = '';
    // console.log("Click Login")
  }

  onSignin() {
    this.error = '';
    // console.log("Signin CLicked")
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        // store tokens
        this.auth.setTokens(res.access, res.refresh);
        // optional: store user in local storage
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']); // homepage or dashboard
      },
      error: err => {
        this.error = err?.error?.error || 'Invalid credentials';
      }
    });
  }

} 