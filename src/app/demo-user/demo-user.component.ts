import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-user',
  templateUrl: './demo-user.component.html',
  styleUrls: ['./demo-user.component.css']
})
export class DemoUserComponent {
  // This component will show information about the demo user
  username: string = 'Demo User';
}
