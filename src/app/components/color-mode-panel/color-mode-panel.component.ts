import { Component } from '@angular/core';

@Component({
  selector: 'app-color-mode-panel',
  templateUrl: './color-mode-panel.component.html',
  styleUrl: './color-mode-panel.component.css'
})
export class ColorModePanelComponent {
  isDarkMode = false;

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
