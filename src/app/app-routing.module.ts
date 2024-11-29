import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LandingPageComponent } from "./components/Customer/landing-page/landing-page.component";
import { ExlporeCarComponent } from "./components/exlpore-car/exlpore-car.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutComponent } from "./components/about/about.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProfileSetComponent } from "./components/profile/profile-navbar/profile-set/profile-set.component";
import { ProfileNavbarComponent } from "./components/profile/profile-navbar/profile-navbar.component";
import { HistoryComponent } from "./components/profile/history/history.component";
import { SearchCarComponent } from "./components/Customer/landing-page/search-car/search-car.component";
import { ResetComponent } from "./components/reset/reset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminLandingComponent } from "./components/dashboard/admin-landing/admin-landing.component";
import { CustomerComponent } from "./components/dashboard/customer/customer.component";
import { BookingComponent } from "./components/dashboard/booking/booking.component";
import { SettingsComponent } from "./components/dashboard/settings/settings.component";
import { CarsComponent } from "./components/dashboard/cars/cars.component";
import { ProfileFormComponent } from "./components/dashboard/settings/profile-form/profile-form.component";
import { PasswordUpdateComponent } from "./components/dashboard/settings/password-update/password-update.component";
import { RevenueComponent } from "./components/dashboard/revenue/revenue.component";
import { NgModule } from "@angular/core";




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
      { path: 'profile-setting', component: ProfileSetComponent },
      { path: 'profile-Nav', component: ProfileNavbarComponent },
      { path: 'history', component: HistoryComponent },
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