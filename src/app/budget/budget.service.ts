import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BudgetItem {
  budgetId?: number;
  categoryName: string;
  monthlyLimit: number;
  currentSpent: number;
  budgetMonthYear?: number;
  status?: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api/budget';
  
  constructor(private http: HttpClient) { }
  
  // Get all budgets for a user
  getBudgetsByUser(userId: number): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(`${this.apiUrl}/${userId}`);
  }
  
  // Add a new budget item
  addBudget(budget: BudgetItem): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(`${this.apiUrl}/add`, budget);
  }
  
  // Update an existing budget item
  updateBudget(budget: BudgetItem): Observable<BudgetItem> {
    return this.http.put<BudgetItem>(`${this.apiUrl}/update`, budget);
  }
  
  // Delete a budget item
  deleteBudget(budgetId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${budgetId}`);
  }
  
  // Calculate budget progress percentage
  getProgress(spent: number, allocated: number): number {
    return allocated ? Math.min((spent / allocated) * 100, 100) : 0;
  }
}