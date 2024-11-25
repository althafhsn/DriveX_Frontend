import { Component, EventEmitter, Output } from '@angular/core';
import { Car } from '../../../../models/car.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  @Output() carAdded: EventEmitter<Car> = new EventEmitter();

  newCar: Car = {
    id: '',
    brandId: '',
    brandName: '',
    modelId: '',
    modelName: '',
    regNo: '',
    pricePerDay: 0,
    gearType: '',
    fuelType: '',
    mileage: '',
    seatCount: '',
    images: [],
    status: 'Available',
  };

  

  brands: { id: string; name: string }[] = [];
  models: { id: string; name: string }[] = [];
  showAddBrand = false;
  showAddModel = false;
  newBrandName = '';
  newModelName = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBrands();
    
  }
  
  selectedImages: string[] = []; // This will store Base64 strings

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files).slice(0, 4); // Limit to 4 files
  
      this.selectedImages = []; // Clear previous images
  
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result); // Base64 string
        };
        reader.readAsDataURL(file); // Convert file to Base64
      });
    }
  }
  
  removeImage(index: number): void {
    this.selectedImages.splice(index, 1); // Remove the image from the list
  }
  

  /**
   * Fetch all brands
   */
  fetchBrands(): void {
    this.isLoading = true;
    this.http
      .get<{ id: string; name: string }[]>('http://localhost:5147/api/Brand/get-all-brand')
      .subscribe(
        (data) => {
          this.brands = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching brands:', error);
          this.isLoading = false;
        }
      );
  }

  /**
   * Fetch models based on the selected brand ID
   * @param brandid
   */
  onBrandChange(event: any): void {
    const selectedBrandId = (event.target as HTMLSelectElement).value; // Extract value
    if (selectedBrandId) {
      this.http
        .get<{ id: string; name: string }[]>(`http://localhost:5147/api/Model/brand/${selectedBrandId}`)
        .subscribe(
          (data) => {
            this.models = data;
          },
          (error) => {
            console.error('Error fetching models:', error);
          }
        );
    } else {
      this.models = [];
    }
  }


  /**
   * Toggle Add Brand input
   */
  toggleAddBrand(): void {
    this.showAddBrand = !this.showAddBrand;
  }

  /**
   * Add a new brand
   */
  addBrand(): void {
    if (!this.newBrandName.trim()) {
      alert('Brand name cannot be empty');
      return;
    }

    this.isLoading = true;
    this.http
      .post('http://localhost:5147/api/Brand/add-new-brand', { name: this.newBrandName })
      .subscribe(
        () => {
          this.fetchBrands();
          this.newBrandName = '';
          this.showAddBrand = false;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error adding brand:', error);
          this.isLoading = false;
        }
      );
  }

  /**
   * Toggle Add Model input
   */
  toggleAddModel(): void {
    if (!this.newCar.brandId) {
      alert('Please select a brand before adding a model');
      return;
    }
    this.showAddModel = !this.showAddModel;
  }

  /**
   * Add a new model
   */
  addModel(): void {
    if (!this.newModelName.trim() || !this.newCar.brandId) {
      alert('Model name cannot be empty and a brand must be selected');
      return;
    }

    this.isLoading = true;
    this.http
      .post('http://localhost:5147/api/Model/add-new-model', {
        name: this.newModelName,
        brandId: this.newCar.brandId,
      })
      .subscribe(
        () => {
          this.onBrandChange(this.newCar.brandId);
          this.newModelName = '';
          this.showAddModel = false;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error adding model:', error);
          this.isLoading = false;
        }
      );
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (!this.isCarFormValid()) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    // Prepare the car data as a JSON object
    const carData = {
      brandId: this.newCar.brandId.trim(),
      modelId: this.newCar.modelId.trim(),
      regNo: this.newCar.regNo.trim(),
      pricePerDay: this.newCar.pricePerDay,
      gearType: this.newCar.gearType.trim(),
      fuelType: this.newCar.fuelType.trim(),
      mileage: this.newCar.mileage.trim(),
      seatCount: String(this.newCar.seatCount).trim(),
      images: this.selectedImages.map((image, index) => ({
        id: this.generateGuid(), // Generate a unique ID for each image
        imagePath: image, // Assuming `image` is a Base64 string
      })),
      status: "Available",
    };
    
    // Utility function to generate GUIDs
   
    
  
    console.log('Payload being sent:', carData);
    // POST API call with JSON payload
    this.http.post('http://localhost:5147/api/Car', carData).subscribe(
      (response) => {
        console.log('Car added successfully:', response);
        alert('Car added successfully!');
        this.resetForm();
      },
      (error) => {
        console.error('Error adding car:', error);
        alert('Failed to add car. Please try again.');
      }
    );
  }
  
  
  /**
   * Validate form fields
   */
  isCarFormValid(): boolean {
    return (
      !!this.newCar.brandId &&
      !!this.newCar.modelId &&
      !!this.newCar.regNo &&
      this.newCar.pricePerDay > 0 &&
      !!this.newCar.gearType &&
      !!this.newCar.fuelType &&
      !!this.newCar.mileage &&
      !!this.newCar.seatCount &&
      this.selectedImages.length > 0 // Ensure at least one image is uploaded
    );
  }
  
  /**
   * Reset form fields
   */
  resetForm(): void {
    this.newCar = {
      id: '',
      brandId: '',
      brandName: '',
      modelId: '',
      modelName: '',
      regNo: '',
      pricePerDay: 0,
      gearType: '',
      fuelType: '',
      mileage: '',
      seatCount: '',
      images: [
        
      ],
      status: 'Available',
    };
    this.models = [];
    this.selectedImages = []; // Clear selected images
  }

  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
}