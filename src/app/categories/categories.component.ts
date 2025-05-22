import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories = [
    { name: 'Food', limit: 5000, spent: 1200 },
    { name: 'Travel', limit: 10000, spent: 3000 },
    { name: 'Shopping', limit: 7000, spent: 4500 }
  ];

  // default new category
  newCategory = { name: '', limit: 100, spent: 100 };

  addCategory() {
    if (this.newCategory.name && this.newCategory.limit >= 100) {
      this.categories.push({
        name: this.newCategory.name,
        limit: this.newCategory.limit,
        spent: this.newCategory.spent
      });
      // reset form
      this.newCategory = { name: '', limit: 100, spent: 100 };
    }
  }

  getProgress(spent: number, limit: number): number {
    return limit ? Math.min((spent / limit) * 100, 100) : 0;
  }
}
