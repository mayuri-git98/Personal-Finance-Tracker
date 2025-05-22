import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="balance-card">
      <p>Balance</p>
      <h3>₹{{ balance }}</h3>
    </div>
  `,
  styles: [`
    .balance-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      border-top: 4px solid #3d5afe;
    }
    
    .balance-card p {
      color: #666;
      margin-bottom: 8px;
      font-size: 16px;
    }
    
    .balance-card h3 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #333;
    }
  `]
})
export class BalanceComponent {
  @Input() balance: number = 0;
}