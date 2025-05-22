import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {
  @Output() navItemClick = new EventEmitter<string>();

  selectedItem: string = 'dashboard'; // Default selection

  selectNavItem(item: string): void {
    this.selectedItem = item;
    this.navItemClick.emit(item);
  }
}
