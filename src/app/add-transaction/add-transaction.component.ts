import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  amount = 0;
  type = 'expense';
  description = '';

  saveTransaction() {
    // Logic to save the transaction
    console.log({ amount: this.amount, type: this.type, description: this.description });
  }
}
