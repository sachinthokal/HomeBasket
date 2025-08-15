import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.Service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth-guard';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {

  username: string | null = null;


  constructor(private router: Router, private authService: AuthService, private authGuard: AuthGuard) { }


  ngOnInit(): void {

    if (!this.authService.currentUser$.subscribe(first_name => this.username = first_name)) {
      this.authService.currentUser$.subscribe(username => this.username = username)
    }

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // JWT token included
    });
  }



  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

}
