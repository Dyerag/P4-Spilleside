import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styles: [`
    .input { width: 100%; padding: 0.5rem; margin-bottom: 1rem; }
    .button { width: 100%; padding: 0.5rem; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        alert('Login success!');
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Login failed!')
      }
    });
  }
}
