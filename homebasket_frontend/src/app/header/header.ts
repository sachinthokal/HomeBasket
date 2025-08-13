import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {
  currentDateTime = '';
   isLoggedIn: boolean = false;
 
  constructor(private router: Router, private authService: AuthService) { }

  activeProfile = '';

  ngOnInit(): void {

    this.authService.getProfile().subscribe((profile: any) => {
      console.log(profile.first_name);
      this.activeProfile = profile.first_name;

      this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    });

    
  }

  logout() {
    console.log("Logout CLicked")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeProfile');
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
