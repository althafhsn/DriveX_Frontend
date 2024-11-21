import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchChanged.emit(inputElement.value);  // Emit the search query (input value)
  }
}  