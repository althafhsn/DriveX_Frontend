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
 role!:string
  constructor(
    private authService: AuthService,
    private userstore:UserStoreService

  ) { }
  
  logout() {
    this.authService.signout();
  }
  ngOnInit(): void {
    this.userstore.getRoleFromStore().subscribe({
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
