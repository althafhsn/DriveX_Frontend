import { Component,Output,EventEmitter} from '@angular/core';
import { Manager } from '../../../../models/manager.model';
import { ManagerService } from '../../../../services/manager.service';
@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css'
})
export class AddManagerComponent {
  @Output() managerAdded = new EventEmitter<Manager>();

  // Manager object bound to the form
  newManager: Manager = {
    id: '',
    firstName: '',
    lastName: '',
    image: '',
    nic: '',
    role: 2, // Assuming '2' represents the Manager role
    email: '',
    addresses: [
      { id: '', houseNo: '', street1: '', street2: '', city: '', zipCode: 0, country: '' }
    ],
    phoneNumbers: [{ id: '', mobile1: '' }],
    notes: '',
    password : ''
  };

  constructor(private managerService:ManagerService) {}

  // Method to handle form submission
  onAddManager() {
    this.managerService.addManager(this.newManager).subscribe({
      next: (response) => {
        alert('Manager added successfully!');
        // this.managerAdded.emit(response); // Emit the added manager data
        window.location.reload();
      },
      error: (err) => {
        alert('Failed to add manager!');
        console.error(err);
      }
    });
  }

  // Add a new address
  addAddress() {
    this.newManager.addresses.push({
      id: '',
      houseNo: '',
      street1: '',
      street2: '',
      city: '',
      zipCode: 0,
      country: ''
    });
  }

  // Remove an address
  removeAddress(index: number) {
    this.newManager.addresses.splice(index, 1);
  }

  // Add a new phone number
  addPhoneNumber() {
    this.newManager.phoneNumbers.push({ id: '', mobile1: '' });
  }

  // Remove a phone number
  removePhoneNumber(index: number) {
    this.newManager.phoneNumbers.splice(index, 1);
  }
}
