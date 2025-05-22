import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="income-card">
      <p>Income</p>
      <h3>₹{{ income }}</h3>
    </div>
  `,
  styles: [`
    .income-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      border-top: 4px solid #4caf50;
    }
    
    .income-card p {
      color: #666;
      margin-bottom: 8px;
      font-size: 16px;
    }
    
    .income-card h3 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #333;
    }
  `]
})
export class IncomeComponent {
  @Input() income: number = 0;
}