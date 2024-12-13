import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserStoreService } from '../../../services/user-store.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

 

 public role:string | null = null;
 public token:string | null = null;

  constructor(
    private authService: AuthService,
    private store:UserStoreService

  ) { }
  
  logout() {
    this.authService.signout();
  }
  ngOnInit(): void {
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
  
      this.token = this.authService.getToken();
      this.store.getRoleFromStore().subscribe({
        next: (val) => {
          this.role = val || this.authService.getRoleFromToken();
        },
        error: (err) => {
          console.error("Failed to fetch role from store:", err);
        }
      });
  }
}
