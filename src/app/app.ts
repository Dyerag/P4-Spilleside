import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule , HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'spilleside';

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    const path = this.router.url;
    return path === '/login' || path === '/register';
  }
}
