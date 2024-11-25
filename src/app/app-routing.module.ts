import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { ConformRentComponent } from './components/Customer/conform-rent/conform-rent.component';
import { AllCarsComponent } from './components/Customer/all-cars/all-cars.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AdminLandingComponent } from './components/dashboard/admin-landing/admin-landing.component';
import { CustomerComponent } from './components/dashboard/customer/customer.component';
import { BookingComponent } from './components/dashboard/booking/booking.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { ProfileFormComponent } from './components/dashboard/settings/profile-form/profile-form.component';
import { PasswordUpdateComponent } from './components/dashboard/settings/password-update/password-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RevenueComponent } from './components/dashboard/revenue/revenue.component';
import { ProfileSetComponent } from './components/profile/profile-navbar/profile-set/profile-set.component';
import { ProfileNavbarComponent } from './components/profile/profile-navbar/profile-navbar.component';
import { HistoryComponent } from './components/profile/history/history.component';


const routes: Routes = [
  {path:'',redirectTo:'LandingPage',pathMatch:'full'},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'LandingPage',component:LandingPageComponent},
  {path:'ConfirmRent',component:ConformRentComponent},
  {path:'Explorecar',component:AllCarsComponent},
  {path:'Contact',component:ContactComponent},
  {path:'About',component:AboutComponent},
  {path:'Profile',component:ProfileComponent},
  {path:'Profile-setting',component:ProfileSetComponent},
  {path:'Profile-Nav',component:ProfileNavbarComponent},
  {path:'History',component:HistoryComponent},
  

  { path : 'dashboard', component:DashboardComponent, 
    children : [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {path: 'main',component:AdminLandingComponent},
      { path: 'customers', component: CustomerComponent },
      { path: 'bookings', component: BookingComponent },
      {path: 'settings', component: SettingsComponent},
      {path:'revenue', component:RevenueComponent}
        
    ]
   } //canActivate: [authGuard]
];


  
 @NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
