import { Component,Input,Output,EventEmitter} from '@angular/core';
import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
@Component({
  selector: 'app-all-cars-list-dash',
  templateUrl: './all-cars-list.component.html',
  styleUrl: './all-cars-list.component.css'
})
export class AllCarsListComponent {
  @Input() cars: Car[] = []; // Array to store cars fetched from API
  @Output() selectedCar = new EventEmitter<Car>(); // Emit the selected car object

  selectedCarId!: string  // Track the selected car ID
  errorMessage!: string

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    console.log('Cars array on init:', this.cars); // Log cars array to debug
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

  // Emit selected car and track ID
  selectCar(car: Car): void {
    console.log('Car selected:', car);
    this.selectedCar.emit(car); // Emit the selected car to the parent
    this.selectedCarId = car.id; // Update the selected car ID
  }
  @Output() showAddCar = new EventEmitter<void>(); 

  openAddCar():void {
    this.showAddCar.emit(); // Display the AddCarComponent
  }

}