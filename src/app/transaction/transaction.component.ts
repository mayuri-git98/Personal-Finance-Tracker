import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [TransactionService], // Added TransactionService to providers
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  
  newTransaction: Transaction = this.getEmptyTransaction();

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    console.log('TransactionComponent initialized');
    this.checkBackendConnection();
    this.loadTransactions();
    this.loadSummary();
  }

  private getEmptyTransaction(): Transaction {
    return {
      category: '',
      amount: 0,
      transactionType: 'EXPENSE',
      transactionDate: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: 'CASH'
    };
  }

  checkBackendConnection(): void {
    // Add a log to check if backend is reachable
    console.log('Checking connection to backend at:', this.transactionService['apiUrl']);
  }

  loadTransactions(): void {
    this.errorMessage = '';
    this.isLoading = true;
    console.log('Loading transactions...');
    
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        console.log('Transactions loaded:', data);
        this.transactions = data || [];
        this.isLoading = false;
        
        if (this.transactions.length === 0) {
          console.log('No transactions returned from API');
        }
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = `Failed to load transactions: ${error.message || 'Unknown error'}`;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('Transaction loading completed');
      }
    });
  }

  loadSummary(): void {
    this.errorMessage = '';

    // Load total income
    this.transactionService.getTotalIncome().subscribe({
      next: (data) => {
        console.log('Total income loaded:', data);
        this.totalIncome = data;
      },
      error: (error) => {
        console.error('Error fetching total income:', error);
        this.totalIncome = 0;
      }
    });

    // Load total expenses
    this.transactionService.getTotalExpenses().subscribe({
      next: (data) => {
        console.log('Total expenses loaded:', data);
        this.totalExpenses = data;
      },
      error: (error) => {
        console.error('Error fetching total expenses:', error);
        this.totalExpenses = 0;
      }
    });

    // Load balance
    this.transactionService.getBalance().subscribe({
      next: (data) => {
        console.log('Balance loaded:', data);
        this.balance = data;
      },
      error: (error) => {
        console.error('Error fetching balance:', error);
        this.balance = 0;
      }
    });
  }

  addTransaction(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (!this.newTransaction.category) {
      this.errorMessage = 'Please select a category';
      return;
    }
    
    if (!this.newTransaction.amount) {
      this.errorMessage = 'Please enter an amount';
      return;
    }
    
    // Set transaction type based on category
    this.newTransaction.transactionType = this.newTransaction.category === 'Income' ? 'INCOME' : 'EXPENSE';
    
    // If it's an expense, ensure the amount is negative
    if (this.newTransaction.transactionType === 'EXPENSE' && this.newTransaction.amount > 0) {
      this.newTransaction.amount = -Math.abs(this.newTransaction.amount);
    } else if (this.newTransaction.transactionType === 'INCOME' && this.newTransaction.amount < 0) {
      this.newTransaction.amount = Math.abs(this.newTransaction.amount);
    }
    
    console.log('Adding transaction:', this.newTransaction);
    
    this.transactionService.addTransaction(this.newTransaction).subscribe({
      next: (response) => {
        console.log('Transaction added successfully:', response);
        if (response) {
          this.transactions.unshift(response); // Add to beginning of array
        }
        this.loadSummary();
        this.successMessage = 'Transaction added successfully!';
        
        // Reset form
        this.newTransaction = this.getEmptyTransaction();
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
        this.errorMessage = `Failed to add transaction: ${error.message || 'Unknown error'}`;
      }
    });
  }

  deleteTransaction(id: number): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (!id) {
      console.error('Cannot delete transaction without ID');
      this.errorMessage = 'Cannot delete transaction without ID';
      return;
    }
    
    if (confirm('Are you sure you want to delete this transaction?')) {
      console.log('Deleting transaction with ID:', id);
      
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          console.log('Transaction deleted successfully');
          this.transactions = this.transactions.filter(t => t.transactionId !== id);
          this.loadSummary();
          this.successMessage = 'Transaction deleted successfully!';
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
          this.errorMessage = `Failed to delete transaction: ${error.message || 'Unknown error'}`;
        }
      });
    }
  }

  getTransactionClass(amount: number): string {
    return amount < 0 ? 'negative-amount' : 'positive-amount';
  }

  // For debugging
  logTransaction(): void {
    console.log('Current transaction form data:', this.newTransaction);
  }
  
  // Helper method to reload data (can be called from UI)
  reloadData(): void {
    this.loadTransactions();
    this.loadSummary();
  }
}