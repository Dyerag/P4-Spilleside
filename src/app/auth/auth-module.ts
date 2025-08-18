import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, Login, Register], 
})
export class AuthModule {}
