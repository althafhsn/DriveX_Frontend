import { Component,Input,EventEmitter,Output } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { CustomerStateService } from '../../../services/customer-state.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 
  @Input() searchText: string = ''; // Bind this to the search bar
  @Output() searchTextChange = new EventEmitter<string>();

  isCustomerActive: boolean = false; // Track if Customer component is active
  private subscription!: Subscription;
  constructor(private searchService: SearchService,
    private customerStateService: CustomerStateService
  ) {}

  ngOnInit(): void {
    // Subscribe to the customer component state
    this.subscription = this.customerStateService.isCustomerActive$.subscribe(
      (isActive) => {
        this.isCustomerActive = isActive;
      }
    );}
    onSearchChange(value: string): void {
      if (this.isCustomerActive) {
        this.searchTextChange.emit(value); // Emit updated value to parent
       
      }
    }
    ngOnDestroy(): void {
      // Unsubscribe from the customer state observable
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}  