import { Component, OnInit } from '@angular/core';
import { Address, Customer,CustomerResponse } from '../../../../models/customer.model';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrl: './profile-set.component.css'
})
export class ProfileSetComponent implements OnInit {
  customer!: Customer
  customerData!: CustomerResponse;
  isEditMode = false; // Toggle flag for edit mode
  addresses!: Address[];
isEditAddressMode: boolean = false;
  isEditPhoneNumberMode: boolean = false;
  
  addAddress(): void {
    this.customer.addresses.push({
      houseNo: '',
      street1: '',
      street2: null, // Optional field can be null
      city: '',
      zipCode: 0, // Initialize with a default number
      country: '',
    });
  }
 

  addPhoneNumber(): void {
    this.customer.phoneNumbers.push({
      mobile1: '', // Initialize with an empty string
    });
  }

  imageSrc: string | ArrayBuffer | null = null;

  constructor(private apiservice: AuthService,  private http: HttpClient) { }

  

  ngOnInit(): void {
    console.log(this.apiservice.getIdFromToken())
    // Fetch data on component initialization
    this.apiservice.getUserInfo().subscribe({
      next: (data) => {
        this.customer = data; // Assuming the API returns an array of Customer
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });

  }

  saveAddresses() {
    const userId = this.apiservice.getIdFromToken();
    if (userId && this.customer.addresses.length <= 2) {
      this.apiservice.updateUserAddresses(userId).subscribe(
        () => {
          console.log('Addresses updated successfully');
          this.toggleEditAddressMode();
        },
        (error) => console.error('Error updating addresses:', error)
      );
    }
  }

  savePhoneNumbers() {
    const userId = this.apiservice.getIdFromToken();
    if (userId && this.customer.phoneNumbers.length <= 2) {
      this.apiservice.updateUserPhoneNumbers(userId).subscribe(
        () => {
          console.log('Phone numbers updated successfully');
          this.toggleEditPhoneNumberMode();
        },
        (error) => console.error('Error updating phone numbers:', error)
      );
    }
  }
   
  toggleEditAddressMode() {
    this.isEditAddressMode = !this.isEditAddressMode;
  }

  toggleEditPhoneNumberMode() {
    this.isEditPhoneNumberMode = !this.isEditPhoneNumberMode;
  }
  
  
  
   toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      // If exiting edit mode, refresh the data
      this.apiservice.getUserInfo().subscribe({
        next: (data) => {
          this.customer = data;
        },
        error: (error) => {
          console.error('Error refreshing data:', error);
        },
      });

    }
  }
  
  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  // Handle drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle file drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  // Function to preview the image
  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageSrc = (e.target as FileReader).result;
    };
    reader.readAsDataURL(file);
  }

  removeAddress(index: number): void {
    this.customer.addresses.splice(index, 1);
  }
  
  removePhoneNumber(index: number): void {
    this.customer.phoneNumbers.splice(index, 1);
  }



  onSubmit() {
   
  }


}
