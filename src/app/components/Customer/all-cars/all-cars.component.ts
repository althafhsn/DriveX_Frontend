


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddFavouriteResponse, Car } from '../../../models/car.model';
import { CarService } from '../../../services/car.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-all-cars-customer',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Output() selectedCar = new EventEmitter<Car>();
  @Input() favourite!: AddFavouriteResponse;
  favourites: AddFavouriteResponse[] = [];

  pickupDate: string | null = localStorage.getItem('pickupDate') || '';
  returnDate: string | null = localStorage.getItem('returnDate') || '';
  getBrandByLocalStorage = localStorage.getItem("selectedCarBrand");
  dateDifference: number | null = null;
  selectedCarID!: string;
  pickupDateError: string | null = null;
  returnDateError: string | null = null;
  errorMessage: string | null = null;

  public id!: string
  favouriteMappings: { [carId: string]: string } = {};
  message: string = '';
  // handleFavoruit: any = this.addToFavorites();
  isText: boolean = false;
  heartIcon!: string
  isMethod: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;

  // Filter properties
  selectedFilters: any = {
    brand: this.getBrandByLocalStorage,
    model: '',
    seatCount: '',
    fuelType: '',
    gearType: ''
  };

  constructor(private carService: CarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Clear the 'selectedCarBrand' from localStorage on page reload
    localStorage.removeItem('selectedCarBrand');
    this.getBrandByLocalStorage = null; // Clear the property as well
    this.validateDates();
    this.calculateDateDifference();
    this.fetchCars();
    this.fetchFavourites();

    this.cars = this.cars.map(card => ({
      ...card,
      isFavourite: false // Default value
    }));
  }

  
    fetchCars(): void {
      this.carService.getCars().subscribe(
        (data: Car[]) => {
          this.cars = data.map(car => ({
            ...car,
            isFavourite: !!this.favouriteMappings[car.id], // Mark as favourite if the carId exists in mapping
          }));
        },
        (error) => {
          console.error('Error fetching car data:', error);
          this.message = 'Failed to load car data. Please try again later.';
        }
      );
    }







  selectCar(card: Car): void {
    this.selectedCarID = card.id;
    console.log(this.selectedCarID)
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
    this.currentPage = 1; 
  }



  onToggleFavourite(car: Car): void {
    const userId = this.authService.getIdFromToken();
    if (!userId) {
      this.message = 'User is not authenticated. Please log in.';
      return;
    }
  
    if (car.isFavourite) {
      // Remove from favorites
      const favouriteId = this.favouriteMappings[car.id];
      if (!favouriteId) {
        console.error('No favourite ID found for car:', car.id);
        return;
      }
  
      this.carService.deleteFavourite(favouriteId).subscribe({
        next: () => {
          this.message = 'Car removed from favorites.';
          car.isFavourite = false; // Update UI
          delete this.favouriteMappings[car.id]; // Remove from mapping
        },
        error: (error) => {
          console.error('Error deleting favorite:', error);
          this.message = 'Failed to remove car from favorites. Please try again.';
        }
      });
    } else {
      // Add to favorites
      const requestBody = {
        id: '',
        carId: car.id,
        userId: userId
      };
  
      this.carService.addToFavourite(requestBody).subscribe({
        next: (response: AddFavouriteResponse) => {
          this.message = 'Car added to favorites.';
          car.isFavourite = true; // Update UI
          this.favouriteMappings[car.id] = response.id; // Store the favouriteId for this car
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
          this.message = 'Failed to add car to favorites. Please try again.';
        }
      });
    }
  }
  
  
  fetchFavourites(): void {
    const userId = this.authService.getIdFromToken();
    this.carService.getFavouritesByUserId(userId).subscribe(
      (data: AddFavouriteResponse[]) => {
        this.favourites = data;
        this.favouriteMappings = {}; // Reset the mapping
        data.forEach((fav) => {
          this.favouriteMappings[fav.carId] = fav.id; // Map carId to favouriteId
          const car = this.cars.find((c) => c.id === fav.carId); // Match with car
          if (car) {
            car.isFavourite = true; // Mark as favorite in the car list
          }
        });
        console.log('Fetched favourites:', this.favourites);
      },
      (error) => {
        this.message = 'Failed to load favorites. Please try again.';
        console.error('Error fetching favorites:', error);
      }
    );
  }
  



}
