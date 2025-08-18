import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: 
    FormBuilder, 
    private router: Router,
    private AuthService: AuthService,
    ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
  
    const { username, password } = this.registerForm.value;
  
    // Først: registrer brugeren
    this.AuthService.register(username, password).subscribe({
      next: () => {
        // Når det lykkes → login med samme data
        this.AuthService.login(username, password).subscribe({
          next: () => {
            this.router.navigate(['/games']);
          },
          error: err => {
            this.errorMessage = 'Login efter registrering mislykkedes';
            console.error(err);
          }
        });
      },
      error: err => {
        if (err.error === 'Username already exists') {
          this.errorMessage = 'Brugernavn findes allerede';
        } else {
          this.errorMessage = 'Noget gik galt ved registrering';
        }
        console.error(err);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
}
