import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  // BehaviorSubjects to store and share financial data across components
  private balanceSubject = new BehaviorSubject<number>(25000);
  private incomeSubject = new BehaviorSubject<number>(40000);
  private expenseSubject = new BehaviorSubject<number>(15000);

  // Observable streams that components can subscribe to
  balance$ = this.balanceSubject.asObservable();
  income$ = this.incomeSubject.asObservable();
  expense$ = this.expenseSubject.asObservable();

  constructor() { }

  // Getters for current values
  get balance(): number {
    return this.balanceSubject.value;
  }

  get income(): number {
    return this.incomeSubject.value;
  }

  get expense(): number {
    return this.expenseSubject.value;
  }

  // Methods to update values
  updateBalance(value: number): void {
    this.balanceSubject.next(value);
  }

  updateIncome(value: number): void {
    this.incomeSubject.next(value);
    this.calculateBalance();
  }

  updateExpense(value: number): void {
    this.expenseSubject.next(value);
    this.calculateBalance();
  }

  // Recalculate balance when income or expense changes
  private calculateBalance(): void {
    const newBalance = this.income - this.expense;
    this.balanceSubject.next(newBalance);
  }

  // Method to add income transaction
  addIncome(amount: number): void {
    this.updateIncome(this.income + amount);
  }

  // Method to add expense transaction
  addExpense(amount: number): void {
    this.updateExpense(this.expense + amount);
  }
}