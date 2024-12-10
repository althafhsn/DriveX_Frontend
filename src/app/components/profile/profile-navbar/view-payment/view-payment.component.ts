import { Component } from '@angular/core';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent {
  contactdata = {
    address:'',
    address2:'',
    phoneNumber1: '',
    phoneNumber2: '',
    Email: '',
  };

  onSubmit() {
   
  }
}
