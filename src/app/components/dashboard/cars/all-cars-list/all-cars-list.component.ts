import { Component,Input,Output,EventEmitter} from '@angular/core';
import { AssociatedCustomer, Car, CarCustomerResponse } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
@Component({
  selector: 'app-all-cars-list-dash',
  templateUrl: './all-cars-list.component.html',
  styleUrl: './all-cars-list.component.css'
})
export class AllCarsListComponent {
  @Input() cars: Car[] = []; // Array to store cars fetched from API
  @Output() selectedCar = new EventEmitter<CarCustomerResponse>(); // Emit the selected car object with associated customer details
  @Output() showAddCar = new EventEmitter<void>(); // Emit event to show Add Car component
  
  errorMessage: string | null = null;
  carSelected: CarCustomerResponse | null = null;
  associatedCustomer: any = null; // Fixed typo: 'assosiatedCustomer' -> 'associatedCustomer'
  selectedCarId: string | null = null; // Track the selected car ID

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    console.log('Cars array on init:', this.cars); // Log cars array for debugging
    this.loadCars(); // Load cars from backend
  }

  // Load cars from API
  loadCars(): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        console.log('Fetched car data:', data);
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching car data:', error);
        this.errorMessage = 'Failed to load car data.';
      }
    );
  }

  // Fetch car details with associated customer on click
  onCarClick(car: Car): void {
    if (car && car.id) {
      this.carService.getCarDetailsWithCustomer(car.id).subscribe(
        (response: { car: Car; customer?: AssociatedCustomer }) => {
          const mappedResponse: CarCustomerResponse = {
            car: response.car,
            customer: response.customer,
            message: 'Success' // or any default message if required
          };
          console.log('Mapped Car with associated customer info:', mappedResponse);
          this.carSelected = mappedResponse;
          this.selectedCar.emit(mappedResponse);
        },
        (error) => {
          console.error('Error fetching car and customer details:', error);
          this.errorMessage = 'Failed to load car and customer details.';
        }
      );
    }
  }
  
  // Emit event to show Add Car component
  openAddCar(): void {
    this.showAddCar.emit();
  }

}