import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.css'
})
export class AllCarsComponent {
  cards: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor() {
    // Generate dummy card data
    this.cards = Array.from({ length:30 }, (_, i) => ({
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

  get paginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.cards.length / this.itemsPerPage);
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
}
