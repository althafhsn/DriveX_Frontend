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
    this.cards = Array.from({ length: 30 }, (_, i) => {
        const seatCount = 4 + i; // Calculate seatCount
        const Fuel = seatCount % 2 === 0 ? "Automatic" : "Manual"; // Determine fuel type based on seatCount
       const Geartype = seatCount % 3  === 0 ? "Automatic" : "Manual";
        return {
            id: i + 1,
            title: `BMW Series ${i + 1}`,
            image: `https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/10/featured-car-${12 + (i % 3)}.jpg`,
            price: `$${50 + i}/Day`,
            description: `Description for BMW Series ${i + 1}.`,
            seatCount: seatCount,
            doors: 4,
            fuel: Fuel ,// Assign the fuel type
            Gear:Geartype
        };
    });
}

filterCriteria = {
  brand: '',
  description: '',
  seatCount: '',
  fuel: '',
  gear: ''
};


  // Lifecycle hook to retrieve selected dates
  ngOnInit(): void {
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');
  }
    // Calculate the difference in days if both dates are available
    calculateDateDifference(): void {
      if (this.pickupDate && this.returnDate) {
        const pickup = new Date(this.pickupDate);
        const returnD = new Date(this.returnDate);
        
        // Ensure that the return date is after the pickup date
        if (returnD > pickup) {
          const timeDiff = returnD.getTime() - pickup.getTime();
          this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Difference in days
        } else {
          this.dateDifference = null; // Reset if invalid range
          alert('Return date must be after the pickup date.');
        }}}

        updateDates(): void {
          if (this.pickupDate && this.returnDate) {
            // Save updated dates to localStorage
            localStorage.setItem('pickupDate', this.pickupDate);
            localStorage.setItem('returnDate', this.returnDate);
      
            // Recalculate date difference after update
            this.calculateDateDifference();
      
            alert('Dates have been updated in localStorage.');
          } else {
            alert('Please select valid dates.');
          }}

  
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
