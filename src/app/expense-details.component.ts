import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from './finance.service';
import { ExpenseComponent } from './expense.component';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ExpenseComponent],
  template: `
    <div class="details-container">
      <h2>Expense Details</h2>
      
      <div class="summary-card">
        <app-expense [expense]="expense"></app-expense>
      </div>
      
      <div class="add-transaction-form">
        <h3>Add New Expense</h3>
        <div class="form-group">
          <label for="amount">Amount (₹)</label>
          <input type="number" id="amount" [(ngModel)]="newExpenseAmount" min="0">
        </div>
        
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" [(ngModel)]="newExpenseCategory">
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" [(ngModel)]="newExpenseDescription">
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" [(ngModel)]="newExpenseDate">
        </div>
        
        <button class="submit-btn" (click)="addExpense()">Add Expense</button>
      </div>
      
      <div class="history-section">
        <h3>Expense History</h3>
        <!-- This would be populated from a transaction service in a real app -->
        <div class="empty-state" *ngIf="expenseHistory.length === 0">
          <p>No expense transactions to display.</p>
        </div>
        
        <div class="transaction-list" *ngIf="expenseHistory.length > 0">
          <div class="transaction-item" *ngFor="let item of expenseHistory">
            <div class="transaction-details">
              <p class="transaction-description">{{item.description}}</p>
              <p class="transaction-category">{{item.category}}</p>
              <p class="transaction-date">{{item.date | date:'mediumDate'}}</p>
            </div>
            <p class="transaction-amount">₹{{item.amount}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    
    .summary-card {
      max-width: 300px;
      margin: 0 auto 30px;
    }
    
    .add-transaction-form {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    
    .add-transaction-form h3 {
      margin-bottom: 15px;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .form-group input, .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .submit-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .submit-btn:hover {
      background-color: #d32f2f;
    }
    
    .history-section h3 {
      margin-bottom: 15px;
      color: #555;
    }
    
    .empty-state {
      padding: 20px;
      text-align: center;
      background-color: #f9f9f9;
      border-radius: 8px;
      color: #888;
    }
    
    .transaction-list {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .transaction-item:last-child {
      border-bottom: none;
    }
    
    .transaction-details {
      flex: 1;
    }
    
    .transaction-description {
      font-weight: 500;
      margin-bottom: 5px;
    }
    
    .transaction-category {
      background-color: #f1f1f1;
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 12px;
      margin-bottom: 5px;
    }
    
    .transaction-date {
      color: #888;
      font-size: 14px;
    }
    
    .transaction-amount {
      font-weight: bold;
      color: #f44336;
    }
  `]
})
export class ExpenseDetailsComponent implements OnInit {
  expense: number = 0;
  newExpenseAmount: number = 0;
  newExpenseCategory: string = '';
  newExpenseDescription: string = '';
  newExpenseDate: string = '';
  
  // Example expense history array - in a real app, this would come from a service
  expenseHistory: {amount: number, category: string, description: string, date: Date}[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService.expense$.subscribe(value => {
      this.expense = value;
    });
    
    // Set default date to today
    const today = new Date();
    this.newExpenseDate = today.toISOString().split('T')[0];
  }

  addExpense(): void {
    if (this.newExpenseAmount > 0 && this.newExpenseDescription && this.newExpenseCategory) {
      // Add to expense history
      this.expenseHistory.push({
        amount: this.newExpenseAmount,
        category: this.newExpenseCategory,
        description: this.newExpenseDescription,
        date: new Date(this.newExpenseDate)
      });
      
      // Update total expense via service
      this.financeService.addExpense(this.newExpenseAmount);
      
      // Reset form
      this.newExpenseAmount = 0;
      this.newExpenseCategory = '';
      this.newExpenseDescription = '';
      
      // Set date back to today
      const today = new Date();
      this.newExpenseDate = today.toISOString().split('T')[0];
    }
  }
}