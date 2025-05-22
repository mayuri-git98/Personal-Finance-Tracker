import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="expense-card">
      <p>Expense</p>
      <h3>₹{{ expense }}</h3>
    </div>
  `,
  styles: [`
    .expense-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      border-top: 4px solid #f44336;
    }
    
    .expense-card p {
      color: #666;
      margin-bottom: 8px;
      font-size: 16px;
    }
    
    .expense-card h3 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #333;
    }
  `]
})
export class ExpenseComponent {
  @Input() expense: number = 0;
}