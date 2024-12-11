import { Component, OnInit } from '@angular/core';
import { profileCustomer,Address } from '../../../../models/profileCustomer.model';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'] // Corrected typo from styleUrl to styleUrls
})
export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  isEditModePersonalInfo = false; // Edit mode for personal information
  isEditModeAddress = false; // Edit mode for addresses
  isEditModePhoneNumber = false; // Edit mode for phone numbers
  isAddingPhoneNumber = false; // To control the display of the new phone number input field
  newPhoneNumberControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]); // Input for new phone number
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomerData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      image: [''],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]], // Email cannot be edited
      licence: [''],
      nic: [{ value: '', disabled: true }, [Validators.required]], // NIC cannot be edited
      addresses: this.fb.array([]), // Dynamic form array for addresses
      phoneNumbers: this.fb.array([]) // Dynamic form array for phone numbers
    });
  }

  loadCustomerData(): void {
    this.authService.getUserInfo().subscribe((customer: any) => {
      this.profileForm.patchValue({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        image: customer.image,
        email: customer.email,
        licence: customer.licence,
        nic: customer.nic
      });

       // Populate addresses
       
        customer.addresses.forEach((address: any) => this.addNewAddress(address));
      
       
        if (customer.phoneNumbers && customer.phoneNumbers.length > 0) {
          customer.phoneNumbers.forEach((phoneNumber: any) => this.addNewPhoneNumber(phoneNumber));
        } else {
          this.addNewPhoneNumber(); // Add an empty phone number field if none exist
        }
      });
    }
  get addresses(): FormArray {
    return this.profileForm.get('addresses') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  deletePhoneNumber(phoneNumberId: string, index: number): void {
    if (confirm('Are you sure you want to delete this phone number?')) {
      this.authService.deletePhoneNumber(phoneNumberId).subscribe(
        (response) => {
          console.log('Phone number deleted successfully!', response);
          alert('Phone number deleted successfully!');
          this.phoneNumbers.removeAt(index);
        },
        (error) => {
          console.error('Error deleting phone number', error);
          alert('Failed to delete the phone number. Please try again.');
        }
      );
    }
  }

  isNewPhoneNumber(index: number): boolean {
    const phoneNumberForm = this.phoneNumbers.at(index);
    return !phoneNumberForm.get('id')?.value;
  }
  
  addExistingPhoneNumber(phoneNumber: any): void {
    if (this.phoneNumbers.length < 2) {
      this.phoneNumbers.push(
        this.fb.group({
          id: [phoneNumber?.id || ''],
          mobile1: [phoneNumber?.mobile1 || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
        })
      );
    }
  }
   // Method to show the "Add Phone Number" input field
   showAddPhoneNumberInput(): void {
    this.isAddingPhoneNumber = true;
    this.newPhoneNumberControl.reset();
  }

  // Method to hide the "Add Phone Number" input field
  cancelAddPhoneNumber(): void {
    this.isAddingPhoneNumber = false;
  }

  // // Method to save a new phone number
  // saveNewPhoneNumber(): void {
  //   if (this.newPhoneNumberControl.invalid) {
  //     alert('Please enter a valid phone number.');
  //     return;
  //   }

  //   const newPhoneNumber = this.newPhoneNumberControl.value; // Get the input value
  //   const customerId = this.authService.getIdFromToken(); // Get the customer's ID from the token

  //   const phoneNumberData = {
  //     mobile1: newPhoneNumber
  //   };

  //   this.authService.addPhoneNumber(customerId, phoneNumberData).subscribe(
  //     (response) => {
  //       console.log('Phone number added successfully!', response);
  //       alert('Phone number added successfully!');
        
  //       // Add the newly saved phone number to the form array
  //       this.phoneNumbers.push(
  //         this.fb.group({
  //           id: [response.id], // Assuming the response contains the ID
  //           mobile1: [response.mobile1, [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  //         })
  //       );

  //       // Hide the Add Phone Number input field
  //       this.isAddingPhoneNumber = false;
  //     },
  //     (error) => {
  //       console.error('Error adding phone number', error);
  //       alert('Failed to add the phone number. Please try again.');
  //     }
  //   );
  // }

  // Method to remove a phone number
  removePhoneNumber(index: number): void {
    const phoneNumberId = this.phoneNumbers.at(index).get('id')?.value;

    if (phoneNumberId) {
      this.authService.deletePhoneNumber(phoneNumberId).subscribe(
        (response) => {
          console.log('Phone number deleted successfully!', response);
          alert('Phone number deleted successfully!');
          this.phoneNumbers.removeAt(index);
        },
        (error) => {
          console.error('Error deleting phone number', error);
          alert('Failed to delete the phone number. Please try again.');
        }
      );
    } else {
      this.phoneNumbers.removeAt(index);
    }
  }
  addNewPhoneNumber(phoneNumber: any = null): void {
    if (this.phoneNumbers.length < 2) {
      this.phoneNumbers.push(this.fb.group({
        id: [phoneNumber?.id || ''],
        mobile1: [phoneNumber?.mobile1 || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      }));
    } else {
      alert('You can only add up to 2 phone numbers.');
    }
  }

  // Add a new address form group
  addNewAddress(address: any = null): void {
    if (this.addresses.length < 2) { // Limit to 2 addresses
      this.addresses.push(this.fb.group({
        id: [address?.id || ''], 
        houseNo: [address?.houseNo || '', [Validators.required]],
        street1: [address?.street1 || '', [Validators.required]],
        street2: [address?.street2 || ''],
        city: [address?.city || '', [Validators.required]],
        zipCode: [address?.zipCode || 0, [Validators.required, Validators.min(1)]],
        country: [address?.country || '', [Validators.required]]
      }));
    } else {
      alert('You can only add up to 2 addresses.');
    }
  }

   // Remove a phone number
  //  removePhoneNumber(index: number): void {
  //   if (this.phoneNumbers.length > 1) {
  //     const phoneNumberId = this.phoneNumbers.at(index).get('id')?.value;
  //     if (phoneNumberId) {
  //       this.authService.deletePhoneNumber(phoneNumberId).subscribe(
  //         (response) => {
  //           console.log('Phone number deleted successfully!', response);
  //           alert('Phone number deleted successfully!');
  //           this.phoneNumbers.removeAt(index);
  //         },
  //         (error) => {
  //           console.error('Error deleting phone number', error);
  //           alert('Failed to delete the phone number. Please try again.');
  //         }
  //       );
  //     } else {
  //       this.phoneNumbers.removeAt(index);
  //     }
  //   }
  // }
  // addNewPhoneNumber(phoneNumber: any = null): void {
  //   if (this.phoneNumbers.length < 2) {  // Limit to 2 phone numbers
  //     this.phoneNumbers.push(this.fb.group({
  //       id: [phoneNumber?.id || ''],  // Use existing phone number ID if available, else set as empty
  //       mobile1: [phoneNumber?.mobile1 || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]]  // Example validation for a 10-digit phone number
  //     }));
  //   } else {
  //     alert('You can only add up to 2 phone numbers.');
  //   }
  // }

  saveNewPhoneNumber(index: number): void {
    const newPhoneNumberForm = this.phoneNumbers.at(index); // Access the form at the given index
    // if (newPhoneNumberForm.invalid) {
    //   alert('Please fill in the required phone number.');
    //   return;
    // }
  
    const newPhoneNumber = newPhoneNumberForm.value;
    const customerId = this.authService.getIdFromToken(); // Get the customer ID
  
    // Call the service to add the phone number
    this.authService.addPhoneNumber(customerId, newPhoneNumber).subscribe(
      (response) => {
        console.log('Phone number added successfully!', response);
        alert('Phone number added successfully!');
        newPhoneNumberForm.patchValue(response); // Update the form with the response (e.g., with an ID from the backend)
      },
      (error) => {
        console.error('Error adding phone number', error);
        alert('Failed to add the phone number. Please try again.');
      }
    );
  }



  // Add a new phone number form group
  addPhoneNumber(): void {
    if (this.phoneNumbers.length < 2) { // Limit to 2 phone numbers
      const newPhoneNumberGroup = this.fb.group({
        mobile1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
      });

      this.phoneNumbers.push(newPhoneNumberGroup); // Add the new phone number form to the form array

      // Automatically call saveNewPhoneNumber for the newly added phone number
      const newPhoneIndex = this.phoneNumbers.length - 1; // Index of the new phone number
      this.saveNewPhoneNumber(newPhoneIndex); 
    }
  }


  // Remove an address form group by index
  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  // Remove a phone number form group by index
  // removePhoneNumber(index: number): void {
  //   if (this.phoneNumbers.length > 1) {
  //     this.phoneNumbers.removeAt(index);
  //   }
  // }
  toggleEditModePersonalInfo(): void {
    this.isEditModePersonalInfo = !this.isEditModePersonalInfo;
    if (!this.isEditModePersonalInfo) {
      this.submitPersonalInfo();
    }
  }

  toggleEditModeAddress(): void {
    this.isEditModeAddress = !this.isEditModeAddress;
  }

  toggleEditModePhoneNumber(): void {
    this.isEditModePhoneNumber = !this.isEditModePhoneNumber;
  }
  deleteAddress(addressId: string, index: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.authService.deleteAddress(addressId).subscribe(
        (response) => {
          console.log('Address deleted successfully!', response);
          alert('Address deleted successfully!');
          // Remove the address from the array after successful deletion
          this.addresses.removeAt(index);
        },
        (error) => {
          console.error('Error deleting address', error);
          alert('Failed to delete the address. Please try again.');
        }
      );
    }}

  // Submit the form data to the API
  submitPersonalInfo(): void {
    const personalInfo = this.profileForm.getRawValue();
    this.authService.updateUserInfo(personalInfo.id, personalInfo).subscribe(
      (response) => {
        console.log('Profile updated successfully!', response);
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert image to Base64
      reader.onload = () => {
        const base64Image = reader.result as string; // Base64 string of the image
        this.profileForm.patchValue({ image: base64Image }); // Update the image in the form
      };
      reader.onerror = (error) => {
        console.error('Error reading image file', error);
      };
    }
  }
  updatePhoneNumber(index: number): void {
    const phoneNumberForm = this.phoneNumbers.at(index); // Get the specific phone number form group
    if (phoneNumberForm.invalid) {
      alert('Please enter a valid phone number.');
      return;
    }

    const phoneNumberId = phoneNumberForm.get('id')?.value; // Extract the phone number ID from the form
    const phoneNumberData = phoneNumberForm.value; // Get the phone number data from the form

    if (!phoneNumberId) {
      alert('Phone number ID is missing.');
      return;
    }

    this.authService.updatePhoneNumber(phoneNumberId, phoneNumberData).subscribe(
      (response) => {
        console.log('Phone number updated successfully!', response);
        alert('Phone number updated successfully!');
        phoneNumberForm.patchValue(response); // Update the form with the response data
      },
      (error) => {
        console.error('Error updating phone number', error);
        alert('Failed to update the phone number. Please try again.');
      }
    );
  }

  
  
  updateAddress(addressIndex: number): void {
    const addressForm = this.addresses.at(addressIndex); 
    const updatedAddress: Address = addressForm.value; 
    const addressId = updatedAddress.id; // Extract the addressId from the form
    console.log('Address ID:', addressId);
    if (!addressId) {
      console.error('Address ID is missing. Make sure it exists in the form.');
      return;
    }
  
    this.authService.updateAddress(addressId, updatedAddress).subscribe(
      (response) => {
        console.log('Address updated successfully!', response);
        alert('Address updated successfully!');
        // Optional: Turn off edit mode
        // this.isEditModeAddress = false;
      },
      (error) => {
        console.error('Error updating address', error);
        alert('Failed to update the address. Please try again.');
      }
    );
  }
  // Save all addresses if multiple edits were made
  submitAllAddresses(): void {
    this.addresses.controls.forEach((addressForm, index) => {
      if (addressForm.dirty) {
        this.updateAddress(index);
      }
    });
  }


  // Add a new address if the customer has less than 2 addresses
  saveNewAddress(index: number): void {
    const newAddressForm = this.addresses.at(index); // Get the address form at the given index
    if (newAddressForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newAddress = newAddressForm.value; // Get the new address details
    const customerId = this.authService.getIdFromToken(); // Get the customer ID
  
    this.authService.addAddress(customerId, newAddress).subscribe(
      (response) => {
        console.log('Address added successfully!', response);
        alert('Address added successfully!');
        
        // Update the address form with the response from the API
        newAddressForm.patchValue(response);
      },
      (error) => {
        console.error('Error adding address', error);
        alert('Failed to add the address. Please try again.');
      }
    );
  }
  isNewAddress(index: number): boolean {
    const address = this.addresses.at(index);
    const addressId = address.get('id')?.value;
    return !addressId; // If there is no ID, it is a new address
  }
}