import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { UserStoreService } from '../../../../services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public users: any = [];

  public fullName: string = "";
  public role: string = "";
  constructor(
    private authService: AuthService,
    private store: UserStoreService
  ) { }

  ngOnInit() {
  
  
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
  


}
