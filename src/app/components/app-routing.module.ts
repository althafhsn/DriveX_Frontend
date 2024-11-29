import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './Customer/landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLandingComponent } from './dashboard/admin-landing/admin-landing.component';
import { CustomerComponent } from './dashboard/customer/customer.component';
import { BookingComponent } from './dashboard/booking/booking.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ProfileFormComponent } from './dashboard/settings/profile-form/profile-form.component';
import { PasswordUpdateComponent } from './dashboard/settings/password-update/password-update.component';
import { ProfileComponent } from './profile/profile.component';
import { RevenueComponent } from './dashboard/revenue/revenue.component';
import { ProfileSetComponent } from './profile/profile-navbar/profile-set/profile-set.component';
import { ProfileNavbarComponent } from './profile/profile-navbar/profile-navbar.component';
import { HistoryComponent } from './profile/history/history.component';
import { CarsComponent } from './dashboard/cars/cars.component';
import { ResetComponent } from './reset/reset.component';
import { ExlporeCarComponent } from './exlpore-car/exlpore-car.component';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SearchCarComponent } from './Customer/landing-page/search-car/search-car.component';



const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'landing', component: LandingComponent, 
    
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'explorecar', component: ExlporeCarComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent },
      // { path: 'profile-setting', component: ProfileSetComponent },
      // { path: 'profile-Nav', component: ProfileNavbarComponent },
      // { path: 'history', component: HistoryComponent },
      { path: 'search', component: SearchCarComponent }
    ]
  },
  { path: 'reset', component: ResetComponent },
  
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: AdminLandingComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'bookings', component: BookingComponent },
      { path: 'settings', component: SettingsComponent },

      { path: 'cars', component: CarsComponent },
      {
        path: 'settings', component: SettingsComponent,
        children: [
          { path: 'profile-settings', component: ProfileFormComponent },
          { path: 'password-update', component: PasswordUpdateComponent },
          // Add other routes
        ]
      },
      { path: 'revenue', component: RevenueComponent }

    ]
  } //canActivate: [authGuard]
];



@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
