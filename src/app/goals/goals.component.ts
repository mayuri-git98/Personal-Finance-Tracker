import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  goals = [
    { name: 'Buy Laptop', targetAmount: 50000, savedAmount: 15000 },
    { name: 'Vacation Trip', targetAmount: 30000, savedAmount: 5000 }
  ];

  // 🛠 Start with 100
  newGoal = { name: '', targetAmount: 100, savedAmount: 100 };

  addGoal() {
    if (this.newGoal.name && this.newGoal.targetAmount >= 100) {
      this.goals.push({
        name: this.newGoal.name,
        targetAmount: this.newGoal.targetAmount,
        savedAmount: this.newGoal.savedAmount
      });
      // Reset form to 100 again
      this.newGoal = { name: '', targetAmount: 100, savedAmount: 100 };
    }
  }

  getProgress(saved: number, target: number): number {
    return target ? Math.min((saved / target) * 100, 100) : 0;
  }
}
