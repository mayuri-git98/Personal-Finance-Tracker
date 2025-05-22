import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Standalone component imports
import { LoginAppComponent } from './login-app/login-app.component';

// Service imports
import { BudgetService } from './budget/budget.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    LoginAppComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BudgetService]
})
export class AppComponent {
  title = 'Finance Tracker';
  currentDate = new Date();
  selectedComponent: string = 'dashboard';
  isLoggedIn: boolean = true; // Set to true by default for development

  constructor(private router: Router) {}

  handleNavItemClick(item: string) {
    this.selectedComponent = item;
    this.router.navigate([`/${item}`]);
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }
}
