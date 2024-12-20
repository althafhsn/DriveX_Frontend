import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { CarDetailsComponent as LandingCarDetails } from './components/Customer/conform-rent/car-details/car-details.component';
import { AllCarsComponent } from './components/Customer/all-cars/all-cars.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
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
import { ProfileComponent } from './components/profile/profile.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { ProfileNavbarComponent } from './components/profile/profile-navbar/profile-navbar.component';
import { FilterPipe } from './filter.pipe';
import { RevenueComponent } from './components/dashboard/revenue/revenue.component';
import { GraphComponent } from './components/dashboard/revenue/graph/graph.component';
import { StatisticsComponent } from './components/dashboard/revenue/statics/statics.component';
import { AddCustomerComponent } from './components/dashboard/customer/add-customer/add-customer.component';
import { CustomerDetailWithCarComponent } from './components/dashboard/customer/customer-detail-with-car/customer-detail-with-car.component';
import { PasswordChangeComponent } from './components/profile/profile-navbar/password-change/password-change.component';
import { CarsComponent } from './components/dashboard/cars/cars.component';
import { AllCarsListComponent } from './components/dashboard/cars/all-cars-list/all-cars-list.component';
import { CarRevenueDetailsComponent } from './components/dashboard/cars/car-revenue-details/car-revenue-details.component';
import { CarTripHistoryComponent } from './components/dashboard/cars/car-trip-history/car-trip-history.component';
import { CarDetailsComponent as Dashcardetails } from './components/dashboard/cars/car-details/car-details.component';
import { AddCarComponent } from './components/dashboard/cars/add-car/add-car.component';
import { ResetComponent } from './components/reset/reset.component';
import { RentedCarListComponent } from './components/dashboard/rented-car-list/rented-car-list.component';
import { RentedCarFilterPipe } from './pipes/rented-car-filter.pipe';
import { ExlporeCarComponent } from './components/exlpore-car/exlpore-car.component';
import { LandingComponent } from './components/landing/landing.component';
import { AllBookingListComponent } from './components/dashboard/booking/all-booking-list/all-booking-list.component';
import { BookingDetailsComponent } from './components/dashboard/booking/booking-details/booking-details.component';
import { BookingCarDetailsComponent } from './components/dashboard/booking/booking-car-details/booking-car-details.component';
import { BookingCustomerDetailsComponent } from './components/dashboard/booking/booking-customer-details/booking-customer-details.component';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { RentalHistoryComponent } from './components/dashboard/rented-car-list/rental-history/rental-history.component';
import { OngoingRentalHistoryComponent } from './components/dashboard/rented-car-list/ongoing-rental-history/ongoing-rental-history.component';
import { RentalFilterPipe } from './components/dashboard/rental-filter.pipe';
 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddManagerComponent } from './components/dashboard/settings/add-manager/add-manager.component';

import { ProfileSettingsComponent } from './components/profile/profile-navbar/profile-settings/profile-settings.component';

import { CancelledHistoryComponent } from './components/dashboard/rented-car-list/cancelled-history/cancelled-history/cancelled-history.component';
import { OverdueRentalsComponent } from './components/dashboard/rented-car-list/overdue-rentals/overdue-rentals/overdue-rentals.component';
import { BookingPipe } from './pipes/booking.pipe';
import { CarsFilterPipe } from './pipes/cars-filter.pipe';




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
    LandingCarDetails,
    AllCarsComponent,
    DashboardComponent,
    ContactComponent,
    AboutComponent,
    CustomerTripHistoryComponent,
    BookingComponent,
    SettingsComponent,
    ProfileInfoComponent,
    TabsComponent,
    ProfileFormComponent,
    PasswordUpdateComponent,
    UpdateCustomerComponent,
    UpdateCarComponent,
    ProfileComponent,
   
    HistoryComponent,
    ProfileNavbarComponent,
   
   
   
    FilterPipe,
    RevenueComponent,
    GraphComponent,
    StatisticsComponent,
    AddCustomerComponent,
    CustomerDetailWithCarComponent,
    PasswordChangeComponent,
    CarsComponent,
    AllCarsListComponent,
    CarRevenueDetailsComponent,
    CarTripHistoryComponent,
    Dashcardetails,
    AddCarComponent,
    ResetComponent,
    RentedCarFilterPipe,
    ExlporeCarComponent,
    LandingComponent,
    AllBookingListComponent,
    BookingDetailsComponent,
    BookingCarDetailsComponent,
    BookingCustomerDetailsComponent,
    CustomerFilterPipe,
    RentedCarListComponent,
    RentalHistoryComponent,
    OngoingRentalHistoryComponent,
    RentalFilterPipe,
    AddManagerComponent,
    ProfileSettingsComponent,
    CancelledHistoryComponent,
    OverdueRentalsComponent,
    BookingPipe,
    CarsFilterPipe


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
     BrowserAnimationsModule
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
