import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private numberService: NumberService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      this.loading = true;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error = 'Login failed. Please try again.';
      this.loading = false;
    }
  }

  quickLogin(): void {
    this.username = 'admin';
    this.password = 'password';
    this.onSubmit();
  }
}
