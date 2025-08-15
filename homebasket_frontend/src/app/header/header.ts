import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth-guard';

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


  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

}
