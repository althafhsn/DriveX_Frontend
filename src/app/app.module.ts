import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { NavbarComponent } from './components/Customer/landing-page/navbar/navbar.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CardComponent,
    LandingPageComponent,
    NavbarComponent,
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
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    HttpClientModule,
    FormsModule
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
