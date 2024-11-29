// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Car } from '../../../models/car.model'; // Ensure Car model is correctly imported
// import { CarService } from '../../../services/car.service'; // Ensure CarService is correctly imported

// @Component({
//   selector: 'app-all-cars',
//   templateUrl: './all-cars.component.html',
//   styleUrls: ['./all-cars.component.css']
// })

// export class AllCarsComponent implements OnInit {
//   @Input() cars: Car[] = []; // Cars fetched from the API
//   @Output() selectedCar = new EventEmitter<Car>();// Properties for selected dates
//   pickupDate: string | null = localStorage.getItem('pickupDate') || '';
//   returnDate: string | null = localStorage.getItem('returnDate') || '';
//   dateDifference: number | null = null;
//   selectedCarID!: string
//   // Validation error messages
//   pickupDateError: string | null = null;
//   returnDateError: string | null = null;
//   errorMessage: string | null = null;

//   // Pagination properties
//   currentPage: number = 1;
//   itemsPerPage: number = 6;

//   constructor(private carService: CarService) { }


//   ngOnInit(): void {
//     this.validateDates(); // Validate dates on initialization
//     this.calculateDateDifference(); // Calculate date difference
//     this.fetchCars(); // Fetch cars from the API
//  
//   /**
//    * Fetch all cars from the API
//    */
//   fetchCars(): void {
//     this.carService.getCars().subscribe(
//       (data: Car[]) => {
//         console.log('Fetched cars:', data);
//         this.cars = data;
//       },
//       (error) => {
//         console.error('Error fetching car data:', error);
//         this.errorMessage = 'Failed to load car data. Please try again later.';
//       }
//     );
//   }

//   selectCar(card: Car): void {
//     this.selectedCar.emit(card);
//     this.selectedCarID = card.id;
//   }
//   validateDates(): void {
//     this.pickupDateError = null;
//     this.returnDateError = null;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Normalize to midnight

//     const pickup = this.pickupDate ? new Date(this.pickupDate) : null;
//     const returnD = this.returnDate ? new Date(this.returnDate) : null;

//     if (pickup) {
//       if (pickup < today) {
//         this.pickupDateError = 'Pickup date cannot be in the past.';
//       }
//     }

//     if (returnD) {
//       if (pickup && returnD <= pickup) {
//         this.returnDateError = 'Return date must be after the pickup date.';
//       }
//     }

//     if (pickup && returnD && !this.pickupDateError && !this.returnDateError) {
//       const timeDiff = returnD.getTime() - pickup.getTime();
//       this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Difference in days
//     } else {
//       this.dateDifference = null; // Reset if invalid
//     }
//   }

//   /**
//    * Calculate the difference in days between pickup and return dates
//    */
//   calculateDateDifference(): void {
//     if (this.pickupDate && this.returnDate) {
//       const pickup = new Date(this.pickupDate);
//       const returnD = new Date(this.returnDate);

//       if (returnD > pickup) {
//         const timeDiff = returnD.getTime() - pickup.getTime();
//         this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Difference in days
//       } else {
//         this.dateDifference = null;
//         alert('Return date must be after the pickup date.');
//       }
//     }
//   }

//   /**
//    * Update dates and save to localStorage
//    */
//   updateDates(): void {
//     if (this.pickupDate && this.returnDate) {
//       localStorage.setItem('pickupDate', this.pickupDate);
//       localStorage.setItem('returnDate', this.returnDate);
//       this.calculateDateDifference();
//       alert('Dates have been updated in localStorage.');
//     } else {
//       alert('Please select valid dates.');
//     }
//   }

//   /**
//    * Paginated cards for display
//    */
//   get paginatedCars(): Car[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.cars.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   /**
//    * Total pages for pagination
//    */
//   totalPages(): number {
//     return Math.ceil(this.cars.length / this.itemsPerPage);
//   }

//   /**
//    * Navigate to the next page
//    */
//   nextPage(): void {
//     if (this.currentPage < this.totalPages()) {
//       this.currentPage++;
//     }
//   }

//   /**
//    * Navigate to the previous page
//    */
//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
// }


 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../../models/car.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-all-cars',
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
    this.validateDates();
    this.calculateDateDifference();
    this.fetchCars();
  }

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
    this.selectedCar.emit(card);
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
