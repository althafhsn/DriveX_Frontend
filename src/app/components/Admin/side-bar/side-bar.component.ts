import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
// Track open/closed state of menus
openMenus: { [key: string]: boolean } = {};

// Toggle menu visibility
toggleMenu(menu: string): void {
  this.openMenus[menu] = !this.openMenus[menu];
}

// Check if a menu is open
isMenuOpen(menu: string): boolean {
  return !!this.openMenus[menu];
}
}
