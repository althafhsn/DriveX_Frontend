import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../../models/customer.model';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrl: './profile-set.component.css'
})
export class ProfileSetComponent  implements OnInit{
  customers:Customer[] = [];

  imageSrc: string | ArrayBuffer | null = null;

  constructor(private apiservice:ApiService){}

  ngOnInit(): void {
    // Fetch data on component initialization
    this.apiservice.getAllUser().subscribe({
      next: (data) => {
        this.customers = data; // Assuming the API returns an array of Customer
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
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
    // Perform profile update logic here
    // console.log('Profile updated successfully!', this.profileData2);
  }

  
}
