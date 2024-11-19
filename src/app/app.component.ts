import { Component, inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DriveX_Frontend';
  private = inject(NgToastService);
  toast: any;
  ngOnInit(): void {
  }

  error(){
    this.toast.danger("This is new error message"); // by default visible duration is 2000ms
  }

  success(){
    this.toast.success("This is new error Success", "SUCCESS", 5000) // message with title and 5000ms duration
  }

  info(){
    this.toast.info("This is new error Info", "INFO", 5000)
  }

  warning(){
    this.toast.warning("This is new Warning message", "WARNING", 5000)
  }
}
