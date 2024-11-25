import { Component, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  selectedTab = 'profile-settings';

  @Output() tabSelected = new EventEmitter<string>();

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.tabSelected.emit(tab);
  }
}
