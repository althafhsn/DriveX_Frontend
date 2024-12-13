import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddFavouriteResponse, Car } from '../../../../../models/car.model';
import { CarService } from '../../../../../services/car.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-favourite-cars',
  templateUrl: './favourite-cars.component.html',
  styleUrl: './favourite-cars.component.css'
})
export class FavouriteCarsComponent {
  @Input() cars: Car[] = [];
  @Output() selectedCar = new EventEmitter<Car>();
  @Input() favourite!: AddFavouriteResponse;
  favourites: AddFavouriteResponse[] = [];

  favouriteMappings: { [carId: string]: string } = {};
  message: string = '';
  selectedCarID!: string;
  pickupDateError: string | null = null;
  returnDateError: string | null = null;

  constructor(private carService: CarService,
    private toast: NgToastService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchFavourites();  // Fetch favorites on component init
  }

  selectCar(card: Car): void {
    this.selectedCarID = card.id;
    console.log(this.selectedCarID);
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
