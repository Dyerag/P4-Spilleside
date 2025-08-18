import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
 
  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }

  goToScoreList() {
    this.router.navigate(['/score-list']);
  }

  goTogames() {
    this.router.navigate(['/games']);
  }
}
