import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/Admin/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/Admin/side-bar/side-bar.component';
import { ColorModePanelComponent } from './components/color-mode-panel/color-mode-panel.component';
import { AddCarComponent } from './components/Admin/add-car/add-car.component';


import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/Customer/landing-page/landing-page.component';
import { SearchComponent } from './components/Customer/search/search.component';
import { BookingComponent } from './components/Customer/booking/booking.component';
import { NavbarComponent } from './components/Customer/landing-page/navbar/navbar.component';
import { SlideshowComponent } from './components/Customer/landing-page/slideshow/slideshow.component';
import { SearchCarComponent } from './components/Customer/landing-page/search-car/search-car.component';
import { BrandComponent } from './components/Customer/landing-page/brand/brand.component';
import { CardComponent } from './components/Customer/landing-page/card/card.component';
import { TypeComponent } from './components/Customer/landing-page/type/type.component';
import { ScrollComponent } from './components/Customer/landing-page/scroll/scroll.component';
import { FooterComponent } from './components/Customer/landing-page/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    SideBarComponent,
    ColorModePanelComponent,
    AddCarComponent,
    LandingPageComponent,
    SearchComponent,
    BookingComponent,
    NavbarComponent,
    SlideshowComponent,
    SearchCarComponent,
    BrandComponent,
    CardComponent,
    TypeComponent,
    ScrollComponent,
    FooterComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
