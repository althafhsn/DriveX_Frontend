import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { NavbarComponent as NavBarLanding } from './components/Customer/landing-page/navbar/navbar.component';
import { SlideshowComponent } from './components/Customer/landing-page/slideshow/slideshow.component';
import { SearchCarComponent } from './components/Customer/landing-page/search-car/search-car.component';
import { BrandComponent } from './components/Customer/landing-page/brand/brand.component';
import { CardComponent } from './components/Customer/landing-page/card/card.component';
import { TypeComponent } from './components/Customer/landing-page/type/type.component';
import { ScrollComponent } from './components/Customer/landing-page/scroll/scroll.component';
import { FooterComponent } from './components/Customer/landing-page/footer/footer.component';
import { ConformRentComponent } from './components/Customer/conform-rent/conform-rent.component';
import { CarDetailsComponent } from './components/Customer/conform-rent/car-details/car-details.component';
import { AllCarsComponent } from './components/Customer/all-cars/all-cars.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { AdminLandingComponent } from './components/dashboard/admin-landing/admin-landing.component';
import { TodayStatsComponent } from './components/dashboard/admin-landing/today-stats/today-stats.component';
import { CarAvailabilityComponent } from './components/dashboard/admin-landing/car-availability/car-availability.component';
import { LiveCarStatusComponent } from './components/dashboard/admin-landing/live-car-status/live-car-status.component';
import { EarningSummaryComponent } from './components/dashboard/admin-landing/earning-summary/earning-summary.component';
import { NavBarComponent as AdminNavbar } from './components/dashboard/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/dashboard/side-bar/side-bar.component';
import { CustomerComponent } from './components/dashboard/customer/customer.component';
import { AllCustomersListComponent } from './components/dashboard/customer/all-customers-list/all-customers-list.component';
import { CustomerDetailsComponent } from './components/dashboard/customer/customer-details/customer-details.component';
import { CustomerPaymentComponent } from './components/dashboard/customer/customer-payment/customer-payment.component';
import { CustomerTripHistoryComponent } from './components/dashboard/customer/customer-trip-history/customer-trip-history.component';
import { BookingComponent } from './components/dashboard/booking/booking.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { ProfileInfoComponent } from './components/dashboard/settings/profile-info/profile-info.component';
import { TabsComponent } from './components/dashboard/settings/tabs/tabs.component';
import { ProfileFormComponent } from './components/dashboard/settings/profile-form/profile-form.component';
import { PasswordUpdateComponent } from './components/dashboard/settings/password-update/password-update.component';
import { UpdateCustomerComponent } from './components/dashboard/settings/update-customer/update-customer.component';
import { UpdateCarComponent } from './components/dashboard/settings/update-car/update-car.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminLandingComponent,
    TodayStatsComponent,
    CarAvailabilityComponent,
    LiveCarStatusComponent,
    EarningSummaryComponent,
    SideBarComponent,
    CustomerComponent,
    AllCustomersListComponent,
    CustomerDetailsComponent,
    CustomerPaymentComponent,
    NavBarLanding,
    CardComponent,
    LandingPageComponent,
    AdminNavbar,
    SlideshowComponent,
    SearchCarComponent,
    BrandComponent,
    CardComponent,
    TypeComponent,
    ScrollComponent,
    FooterComponent,
    ConformRentComponent,
    CarDetailsComponent,
    AllCarsComponent,
    DashboardComponent,
    CustomerTripHistoryComponent,
    BookingComponent,
    SettingsComponent,
    ProfileInfoComponent,
    TabsComponent,
    ProfileFormComponent,
    PasswordUpdateComponent,
    UpdateCustomerComponent,
    UpdateCarComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
