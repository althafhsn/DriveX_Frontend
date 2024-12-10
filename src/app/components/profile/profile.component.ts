import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentView: string = ''; // Tracks the current view

  constructor (private auth:AuthService){

  }
  changeView(view: string) {
    this.currentView = view;
  }

  logout() {
    this.auth.signout()
    // Implement logout functionality here
  }
}
