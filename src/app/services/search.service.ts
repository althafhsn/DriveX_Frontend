import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTextSource = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSource.asObservable();

  setSearchText(text: string): void {
    this.searchTextSource.next(text);
  }
}
