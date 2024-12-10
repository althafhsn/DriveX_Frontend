import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { UserStoreService } from '../../../../services/user-store.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public users: any = [];
  // activeLink: string = '';

  public fullName: string = "";
  // public role: string = "";

  public token: string | null = null;
  public role: string | null = null;


  constructor(private authService: AuthService,private store: UserStoreService,private router: Router)
  { 
    // Automatically set activeLink based on the current route on page load or navigation
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Set the active link to the current route (e.g., 'home' from '/home')
    //     this.setActiveLink(this.router.url.split('/')[1]);
    
    //   }
    // });
  }
  // setActiveLink(link: string): void {
  //   this.activeLink = link;
  // }

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




