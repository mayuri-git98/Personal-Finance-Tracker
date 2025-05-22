import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {  // Changed from LoginComponent to match file name
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegisterMode: boolean = false;
  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  @Output() loginSuccess = new EventEmitter<void>();
  
  constructor(private router: Router) {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    console.log('Constructor - Current User:', currentUser);
    if (currentUser) {
      console.log('User is already logged in, navigating to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }
  
  onLogin() {
    // Basic validation
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }
    
    console.log('Attempting login with:', { email: this.email });
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Retrieved users from localStorage:', users);
    
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);
    
    if (user) {
      console.log('Login successful for user:', this.email);
      // Store current user information
      localStorage.setItem('currentUser', JSON.stringify({ email: this.email }));
      console.log('Current user set in localStorage:', localStorage.getItem('currentUser'));
      this.loginSuccess.emit();
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Login failed: Invalid credentials');
      alert('Invalid credentials');
    }
  }
  
  onRegister() {
    // Basic validation
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (this.password.length < 6 || !/\d/.test(this.password)) {
      alert('Password must be at least 6 characters and contain at least one number');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === this.email);
    
    if (existingUser) {
      alert('User already exists');
    } else {
      users.push({ email: this.email, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      console.log('User registered:', { email: this.email });
      alert('Registration Successful! Please log in.');
      this.toggleMode();
    }
  }
  
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}