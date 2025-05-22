import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceDetailsComponent } from './balance-details.component';
import { IncomeDetailsComponent } from './income-details.component';
import { ExpenseDetailsComponent } from './expense-details.component';

import { BudgetComponent } from './budget/budget.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginAppComponent } from './login-app/login-app.component'; // Updated import name
import { GoalsComponent } from './goals/goals.component';
import { CategoriesComponent } from './categories/categories.component';
import { DemoUserComponent } from './demo-user/demo-user.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Auth guard function
const authGuard = () => {
  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser');
  console.log('Auth Guard - Current User:', currentUser);
  const isLoggedIn = !!currentUser;
  console.log('Auth Guard - Is Logged In:', isLoggedIn);
  
  if (isLoggedIn) {
    return true;
  }
  
  // Not logged in, redirect to login
  console.log('Auth Guard - Redirecting to login');
  return { path: '/login' };
};

export const routes: Routes = [
  // Redirect root to dashboard if authenticated, otherwise to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Login page - no auth required
  { path: 'login', component: LoginAppComponent }, // Updated component name
  
  // Demo - no auth required
  { path: 'demo', component: DemoUserComponent },
  
  // Protected routes - require authentication
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'balance-details',
    component: BalanceDetailsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'income-details',
    component: IncomeDetailsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'expense-details',
    component: ExpenseDetailsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'budget',
    component: BudgetComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'goals',
    component: GoalsComponent,
    canActivate: [() => authGuard()]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [() => authGuard()]
  },
  
  // Catch-all route for unknown paths - redirect to login
  { path: '**', redirectTo: '/login' }
];