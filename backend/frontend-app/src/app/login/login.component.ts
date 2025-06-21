import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

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

  constructor(private router: Router) {}

  async onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username: this.username,
        password: this.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid credentials';
      }
    } catch (error) {
      this.error = 'Login failed. Please try again.';
      console.error('Login error:', error);
    } finally {
      this.loading = false;
    }
  }

  quickLogin() {
    this.username = 'admin';
    this.password = 'admin123';
    this.onLogin();
  }
}
