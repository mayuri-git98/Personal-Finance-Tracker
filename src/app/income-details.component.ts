import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from './finance.service';
import { IncomeComponent } from './income.component';

@Component({
  selector: 'app-income-details',
  standalone: true,
  imports: [CommonModule, FormsModule, IncomeComponent],
  template: `
    <div class="details-container">
      <h2>Income Details</h2>
      
      <div class="summary-card">
        <app-income [income]="income"></app-income>
      </div>
      
      <div class="add-transaction-form">
        <h3>Add New Income</h3>
        <div class="form-group">
          <label for="amount">Amount (₹)</label>
          <input type="number" id="amount" [(ngModel)]="newIncomeAmount" min="0">
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" [(ngModel)]="newIncomeDescription">
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" [(ngModel)]="newIncomeDate">
        </div>
        
        <button class="submit-btn" (click)="addIncome()">Add Income</button>
      </div>
      
      <div class="history-section">
        <h3>Income History</h3>
        <!-- This would be populated from a transaction service in a real app -->
        <div class="empty-state" *ngIf="incomeHistory.length === 0">
          <p>No income transactions to display.</p>
        </div>
        
        <div class="transaction-list" *ngIf="incomeHistory.length > 0">
          <div class="transaction-item" *ngFor="let item of incomeHistory">
            <div class="transaction-details">
              <p class="transaction-description">{{item.description}}</p>
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
    
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .submit-btn {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .submit-btn:hover {
      background-color: #3d8b40;
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
    
    .transaction-date {
      color: #888;
      font-size: 14px;
    }
    
    .transaction-amount {
      font-weight: bold;
      color: #4caf50;
    }
  `]
})
export class IncomeDetailsComponent implements OnInit {
  income: number = 0;
  newIncomeAmount: number = 0;
  newIncomeDescription: string = '';
  newIncomeDate: string = '';
  
  // Example income history array - in a real app, this would come from a service
  incomeHistory: {amount: number, description: string, date: Date}[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService.income$.subscribe(value => {
      this.income = value;
    });
    
    // Set default date to today
    const today = new Date();
    this.newIncomeDate = today.toISOString().split('T')[0];
  }

  addIncome(): void {
    if (this.newIncomeAmount > 0 && this.newIncomeDescription) {
      // Add to income history
      this.incomeHistory.push({
        amount: this.newIncomeAmount,
        description: this.newIncomeDescription,
        date: new Date(this.newIncomeDate)
      });
      
      // Update total income via service
      this.financeService.addIncome(this.newIncomeAmount);
      
      // Reset form
      this.newIncomeAmount = 0;
      this.newIncomeDescription = '';
      
      // Set date back to today
      const today = new Date();
      this.newIncomeDate = today.toISOString().split('T')[0];
    }
  }
}