import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  username: string = 'Demo User';
  notificationCount: number = 3;
  currentDate: string = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  constructor(private router: Router) {}

  // Method to navigate when the Demo User is clicked
  navigateToDemoUser(): void {
    console.log('Navigating to Demo User page');
    this.router.navigate(['/dashboard']).then(success => {
      if (success) {
        console.log('Navigation to Dashboard was successful');
      } else {
        console.log('Navigation to Dashboard failed');
      }
    });
  }

  // Method to select navigation items like notifications and profile
  selectNavItem(item: string): void {
    console.log(`Selected ${item}`);
  }
}
