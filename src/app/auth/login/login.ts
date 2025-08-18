import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.AuthService.login(username, password).subscribe({
      next: () => this.router.navigate(['/games']),
      error: err => {
        this.errorMessage = 'Login mislykkedes';
        console.error(err);
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
