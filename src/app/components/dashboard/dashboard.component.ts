import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public users: any = [];

  public fullName: string = "";
  public role: string = "";
  constructor(
    private authService: AuthService,
    private api: ApiService,
    private store: UserStoreService
  ) { }

  ngOnInit() {
    // Fetch all users
    this.api.getAllUser().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error("Failed to fetch users:", err);
      }
    });
  
    // Fetch and set the user's full name
    this.store.getFullName().subscribe({
      next: (val) => {
        const fullNameFromToken = this.authService.getfullNameFromToken();
        this.fullName = val || fullNameFromToken;
      },
      error: (err) => {
        console.error("Failed to fetch full name from store:", err);
      }
    });
  
    // Fetch and set the user's role
    this.store.getRoleFromStore().subscribe({
      next: (val) => {
        const roleInToken = this.authService.getRoleFromToken();
        this.role = val || roleInToken;
      },
      error: (err) => {
        console.error("Failed to fetch role from store:", err);
      }
    });
  }
  




  logout() {
    this.authService.signout();
  }
}
