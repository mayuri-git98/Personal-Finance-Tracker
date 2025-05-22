export interface Transaction {
  transactionId?: number;
  userId?: number;
  category: string;
  amount: number;
  transactionType: 'INCOME' | 'EXPENSE';
  transactionDate: string;
  paymentMethod?: string;
  description: string;
  createdAt?: string;
}