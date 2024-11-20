import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  // Properties for selected dates
  pickupDate: string | null = '';
  returnDate: string | null = '';
  dateDifference: number | null = null;

  // Properties for car cards and pagination
  cards: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor() {
    // Generate dummy card data
    this.cards = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `BMW Series ${i + 1}`,
      image: `https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/10/featured-car-${12 + (i % 3)}.jpg`,
      price: `$${50 + i}/Day`,
      description: `Description for BMW Series ${i + 1}.`,
      seatCapacity: 4,
      doors: 4,
      fuel: 450
    }));
  }

  // Lifecycle hook to retrieve selected dates
  ngOnInit(): void {
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');

    // Calculate the difference in days if both dates are available
    if (this.pickupDate && this.returnDate) {
      const pickup = new Date(this.pickupDate);
      const returnDate = new Date(this.returnDate);

      // Calculate the difference in milliseconds, then convert to days
      const diffInMs = returnDate.getTime() - pickup.getTime();
      this.dateDifference = diffInMs / (1000 * 60 * 60 * 24); // Convert ms to days
    }
  }

  // Get paginated cards
  get paginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Calculate total pages
  totalPages(): number {
    return Math.ceil(this.cards.length / this.itemsPerPage);
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
