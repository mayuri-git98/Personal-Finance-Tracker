import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError, of } from 'rxjs';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Updated to use relative URL to avoid CORS issues when using a proxy
  private apiUrl = '/api/transactions'; // Changed from http://localhost:8080/api/transactions

  constructor(private http: HttpClient) { }

  // HTTP options with proper headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllTransactions(): Observable<Transaction[]> {
    console.log('Calling API for all transactions');
    return this.http.get<Transaction[]>(this.apiUrl)
      .pipe(
        tap(transactions => console.log('Fetched transactions:', transactions)),
        catchError(this.handleError<Transaction[]>('getAllTransactions', []))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    // Make sure date is in the format expected by Spring Boot
    if (transaction.transactionDate && typeof transaction.transactionDate === 'string') {
      // Ensure date is in YYYY-MM-DD format for Spring Boot
      const dateObj = new Date(transaction.transactionDate);
      if (!isNaN(dateObj.getTime())) {
        transaction.transactionDate = dateObj.toISOString().split('T')[0];
      }
    }

    console.log('Sending transaction to backend:', transaction);

    return this.http.post<Transaction>(this.apiUrl, transaction, this.httpOptions)
      .pipe(
        tap(newTransaction => console.log('Added transaction:', newTransaction)),
        catchError(this.handleError<Transaction>('addTransaction'))
      );
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Deleted transaction with id: ${id}`)),
        catchError(this.handleError<void>('deleteTransaction'))
      );
  }

  getTotalIncome(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-income`)
      .pipe(
        tap(income => console.log('Total income:', income)),
        catchError(this.handleError<number>('getTotalIncome', 0))
      );
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-expenses`)
      .pipe(
        tap(expenses => console.log('Total expenses:', expenses)),
        catchError(this.handleError<number>('getTotalExpenses', 0))
      );
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance`)
      .pipe(
        tap(balance => console.log('Balance:', balance)),
        catchError(this.handleError<number>('getBalance', 0))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // Log the error details for debugging
      console.error('Error details:', {
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        url: error.url
      });
      
      // Return a safe result to keep the app running
      return of(result as T);
    };
  }
}