import { Component,Input,EventEmitter,Output } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { CustomerStateService } from '../../../services/customer-state.service';
import { BookingService } from '../../../services/booking.service';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 
  @Input() searchText: string = ''; // Bind this to the search bar
  @Output() searchTextChange = new EventEmitter<string>();
  isBookingActive:boolean=false;
  isCustomerActive: boolean = false;
  isCarActive : boolean = false // Track if Customer component is active
  private subscription!: Subscription;
  constructor(private searchService: SearchService,
    private customerStateService: CustomerStateService,
    private bookingService:BookingService,
    private carService : CarService
  ) {}

  ngOnInit(): void {
    // Subscribe to the customer component state
    this.subscription = this.customerStateService.isCustomerActive$.subscribe(
      (isActive) => {
        this.isCustomerActive = isActive;
      }
    );

    this.subscription=this.customerStateService.isBookingActive$.subscribe(
      (isActive)=>{
        this.isBookingActive=isActive;
      }
    );
    this.subscription= this.customerStateService.isCarActive$.subscribe(
    (isActive)=>{
      this.isCarActive=isActive;

    }
    )


  }
    
  onSearchChange(value: string): void {
    this.searchService.setSearchText(value); // Update the search text in the service
  }
    ngOnDestroy(): void {
      // Unsubscribe from the customer state observable
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}  