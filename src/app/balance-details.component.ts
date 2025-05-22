import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from './finance.service';
import { BalanceComponent } from './balance.component';

@Component({
  selector: 'app-balance-details',
  standalone: true,
  imports: [CommonModule, FormsModule, BalanceComponent],
  template: `
    <div class="details-container">
      <h2>Balance Details</h2>
      
      <div class="summary-card">
        <app-balance [balance]="balance"></app-balance>
      </div>
      
      <div class="details-info">
        <p>Your current balance is the difference between your income and expenses.</p>
        <p><strong>Income:</strong> ₹{{income}}</p>
        <p><strong>Expenses:</strong> ₹{{expense}}</p>
      </div>
      
      <div class="history-section">
        <h3>Recent Transactions</h3>
        <!-- This would be populated from a transaction service in a real app -->
        <div class="empty-state" *ngIf="true">
          <p>No recent transactions to display.</p>
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
    
    .details-info {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
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
  `]
})
export class BalanceDetailsComponent implements OnInit {
  balance: number = 0;
  income: number = 0;
  expense: number = 0;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService.balance$.subscribe(value => {
      this.balance = value;
    });
    
    this.financeService.income$.subscribe(value => {
      this.income = value;
    });
    
    this.financeService.expense$.subscribe(value => {
      this.expense = value;
    });
  }
}