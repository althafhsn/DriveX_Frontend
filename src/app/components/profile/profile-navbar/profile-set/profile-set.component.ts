import { Component, OnInit } from '@angular/core';
import { Address, Customer,CustomerResponse, PhoneNumber } from '../../../../models/customer.model';
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
  phoneNumbers!:PhoneNumber[];
  isProfileEditMode = false; // For general profile editing
  // isEditable = false;
  isEditModephone = false;
  imageSrc: string | ArrayBuffer | null = null;

  constructor(private apiservice: AuthService,  private http: HttpClient) { }
 // Example customer object
 
 Customer = {
  firstName: '',
  lastName: '',
  nic: '',
  licence: '',
  email: ''
};

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
  addphonenumber():void{
    this.customer.phoneNumbers.push({
      mobile1:'',
    });
  }
 
 
  saveOrEditAddress(index: number): void {
    if (this.isEditMode) {
      // Save the address and make fields readonly
      alert('Address saved successfully!');
      console.log('Saved Address:', this.customer.addresses[index]);
      this.isEditMode = false; // Disable edit mode
    } else {
      // Enable edit mode
      this.isEditMode = true;
    }
  }

  saveOrEditmobile(index:number):void{
    if(this.isEditModephone){
      alert('phone number save successfully!')
      console.log('Saved  Phone:', this.customer.phoneNumbers[index]);
      this.isEditModephone = false; // Disable edit mode

    }
    else {
      // Enable edit mode
      this.isEditModephone = true;}
  }
   

  
  


   


  enableProfileEditMode(): void {
    this.isProfileEditMode = true;
  }

 


  // saveChanges() {
  //   // Logic to save the changes (e.g., sending data to a server or updating local storage)
  //   console.log('Changes saved:', this.customer);
  //   this.isEditMode = false; // Disable edit mode after saving
  // }
  


 

  
  saveProfileChanges(): void {
    console.log('Profile changes saved:', this.customer);
    this.isProfileEditMode = false;
  }


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

  // Method to save an address
  saveAddress(index: number): void {
    const address = this.customer.addresses[index];
    alert('Address saved successfully!');
    console.log('Saved Address:', address);
    // Perform any additional save actions here, like updating a server or local storage.
  }

  savephonenumber(index:number):void{
    const phone = this.customer.phoneNumbers[index];
    alert('Phonenumber saved successfully!');
    console.log('Saved mobile:', phone);
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

  


  onSubmit() {
   
  }



   

}
