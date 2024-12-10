 

 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../../models/car.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-all-cars-customer',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Output() selectedCar = new EventEmitter<Car>();
  
  pickupDate: string | null = localStorage.getItem('pickupDate') || '';
  returnDate: string | null = localStorage.getItem('returnDate') || '';
  getBrandByLocalStorage = localStorage.getItem("selectedCarBrand");
  dateDifference: number | null = null;
  selectedCarID!: string;
  pickupDateError: string | null = null;
  returnDateError: string | null = null;
  errorMessage: string | null = null;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;

  // Filter properties
  selectedFilters: any = {
    brand:this.getBrandByLocalStorage,
    model: '',
    seatCount: '',
    fuelType: '',
    gearType: ''
  };

  constructor(private carService: CarService) { }
 
  ngOnInit(): void {
 // Clear the 'selectedCarBrand' from localStorage on page reload
 localStorage.removeItem('selectedCarBrand');
 this.getBrandByLocalStorage = null; // Clear the property as well
    this.validateDates();
    this.calculateDateDifference();
    this.fetchCars();
  }
  
  // If a value exists, store it temporarily and delete it from localStorage
 

  fetchCars(): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching car data:', error);
        this.errorMessage = 'Failed to load car data. Please try again later.';
      }
    );
  }







  selectCar(card: Car): void {
    this.selectedCarID = card.id;
  }

  validateDates(): void {
    this.pickupDateError = null;
    this.returnDateError = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickup = this.pickupDate ? new Date(this.pickupDate) : null;
    const returnD = this.returnDate ? new Date(this.returnDate) : null;

    if (pickup && pickup < today) {
      this.pickupDateError = 'Pickup date cannot be in the past.';
    }

    if (returnD && pickup && returnD <= pickup) {
      this.returnDateError = 'Return date must be after the pickup date.';
    }

    if (pickup && returnD && !this.pickupDateError && !this.returnDateError) {
      const timeDiff = returnD.getTime() - pickup.getTime();
      this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.dateDifference = null;
    }
  }

  calculateDateDifference(): void {
    if (this.pickupDate && this.returnDate) {
      const pickup = new Date(this.pickupDate);
      const returnD = new Date(this.returnDate);

      if (returnD > pickup) {
        const timeDiff = returnD.getTime() - pickup.getTime();
        this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      } else {
        this.dateDifference = null;
        alert('Return date must be after the pickup date.');
      }
    }
  }

  updateDates(): void {
    if (this.pickupDate && this.returnDate) {
      localStorage.setItem('pickupDate', this.pickupDate);
      localStorage.setItem('returnDate', this.returnDate);
      this.calculateDateDifference();
      alert('Dates have been updated in localStorage.');
    } else {
      alert('Please select valid dates.');
    }
  }

  get paginatedCars(): Car[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cars.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.cars.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Filter change handlers
  onFilterChange(): void {
    this.currentPage = 1; // Reset to first page when filters change
  }
}
