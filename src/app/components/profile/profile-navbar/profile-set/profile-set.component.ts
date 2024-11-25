import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrl: './profile-set.component.css'
})
export class ProfileSetComponent {
  imageSrc: string | ArrayBuffer | null = null;

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
  
  profileData2 = {
    firstName: '',
    lastName: '',
    NIC:'',
    Licence: '' 
  };



  
  onSubmit() {
    // Perform profile update logic here
    console.log('Profile updated successfully!', this.profileData2);
  }

  
}
