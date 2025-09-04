import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.Service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {


  signupForm!: FormGroup;
  loginForm!: FormGroup;
  serverErrors: any = {};
  activeProfile: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      whatsapp_number: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // login.component.ts ngOnInit
    if (this.auth.getAccessToken()) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
      // API call for signup
      this.activeProfile = this.signupForm.value;
      this.auth.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log('Signup Success:', res);
          Swal.fire('Success', 'User registered successfully', 'success');
        },
        error: (err) => {
          console.log('Signup Error:', err);
          Swal.fire('Error', 'Registration failed', 'error');
          this.serverErrors = err.error;
        }
      });

    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login User:', this.loginForm.value.username);
      // API call for login
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (res: any) => {

            //console.log('Login Success:', res);
            Swal.fire('Success', 'Login successful!', 'success');
            this.router.navigate(['/dashboard'], { replaceUrl: true });
          },
          error: (err: any) => {
            console.error('Login Error:', err);
            let message = 'Login failed. Please check credentials.';
            if (err.error && err.error.detail) {
              message = err.error.detail; // DRF error message
            }
            Swal.fire('Error', message, 'error');
          }
        });
    }
  }

} 