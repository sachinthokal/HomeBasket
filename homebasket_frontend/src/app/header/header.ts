import { Component,  OnChanges,  OnInit} from '@angular/core';
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
  currentDateTime = '';
  isLoggedIn = true;
  timestamp = new Date();


  constructor(private router: Router, private authService: AuthService, private authGuard: AuthGuard) { }

  activeProfile = '';

  ngOnInit(): void {

   this.isLoggedIn = this.authGuard.canActivate();

    this.authService.getProfile().subscribe((profile: any) => {
      console.log(profile.first_name);
      this.activeProfile = profile.first_name;
     
    });

  }

  logout() {
    console.log("Logout CLicked")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeProfile');
    this.isLoggedIn = false;
    this.activeProfile = ''
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
