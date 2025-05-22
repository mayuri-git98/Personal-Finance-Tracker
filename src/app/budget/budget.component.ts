import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BudgetService, BudgetItem } from './budget.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare'];
  
  budgetItems: BudgetItem[] = [];
  
  newBudgetItem: BudgetItem = {
    categoryName: '',
    monthlyLimit: 0,
    currentSpent: 0,
    userId: 1 // Default user ID (would normally come from auth service)
  };

  constructor(private budgetService: BudgetService) {}
  
  ngOnInit(): void {
    this.loadBudgetItems();
  }
  
  loadBudgetItems(): void {
    const userId = 1; // Default user ID (would normally come from auth service)
    this.budgetService.getBudgetsByUser(userId).subscribe({
      next: (data) => {
        this.budgetItems = data;
      },
      error: (err) => {
        console.error('Error fetching budget items:', err);
      }
    });
  }

  addBudgetItem(): void {
    if (this.newBudgetItem.categoryName && this.newBudgetItem.monthlyLimit > 0) {
      // Set current month/year in YYYYMM format
      const today = new Date();
      const budgetMonthYear = today.getFullYear() * 100 + (today.getMonth() + 1);
      
      // Determine budget status
      let status = 'ON_TRACK';
      if (this.newBudgetItem.currentSpent > this.newBudgetItem.monthlyLimit) {
        status = 'OVER_BUDGET';
      } else if (this.newBudgetItem.currentSpent < this.newBudgetItem.monthlyLimit) {
        status = 'UNDER_BUDGET';
      }
      
      const budgetToAdd: BudgetItem = {
        ...this.newBudgetItem,
        budgetMonthYear,
        status
      };
      
      this.budgetService.addBudget(budgetToAdd).subscribe({
        next: (response) => {
          this.budgetItems.push(response);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error adding budget item:', err);
        }
      });
    }
  }
  
  resetForm(): void {
    this.newBudgetItem = {
      categoryName: '',
      monthlyLimit: 0,
      currentSpent: 0,
      userId: 1 // Default user ID
    };
  }
  
  getProgress(spent: number, allocated: number): number {
    return this.budgetService.getProgress(spent, allocated);
  }
}