import { Component,Input,EventEmitter,Output } from '@angular/core';
import { SearchService } from '../../../services/search.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // @Output() searchChanged = new EventEmitter<string>();

  // onSearchChange(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.searchChanged.emit(inputElement.value);  // Emit the search query (input value)
  // }
  @Input() searchText: string = ''; // Bind this to the search bar
  @Output() searchTextChange = new EventEmitter<string>();
  constructor(private searchService: SearchService) {}

  onSearchChange(value: string): void {
    this.searchTextChange.emit(value); // Emit updated value to parent
  }
}  