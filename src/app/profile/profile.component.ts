import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id: string = '';        // ID is now editable as a string
  nickname: string = '';
  gender: string = '';

  signOut() {
    alert('Signed Out!');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      alert('Account Deleted.');
    }
  }
}
