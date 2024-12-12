import { Component,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Manager } from '../../../../models/manager.model';
import { ManagerService } from '../../../../services/manager.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {
  @Input() manager!: Manager; // Manager details input
  isEditable = false;
  managerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private router: Router,
    private tostar:NgToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.managerId = params.get('id');
      if (this.managerId) {
        this.getManagerDetails(this.managerId);
      }
    });
  }

  getManagerDetails(id: string): void {
    this.managerService.getManagerById(id).subscribe(
      (response) => {
        this.manager = response;
      },
      (error) => {
        console.error('Error fetching manager details:', error);
      }
    );
  }

  saveManagerDetails(): void {
    if (this.manager) {
      this.managerService.updateManager(this.manager).subscribe(
        (response) => {
          console.log('Manager details updated successfully', response);
          this.isEditable = false; // Turn off edit mode after saving
          this.getManagerDetails(this.manager.id); // Reload manager details
        },
        (error) => {
          console.error('Error updating manager details:', error);
        }
      );
    }
  }

  /**
   * Toggle edit mode and save changes if in edit mode
   */
  toggleEdit(): void {
    if (this.isEditable) {
      this.saveManagerDetails(); // Save details when "Save" mode is triggered
    }
    this.isEditable = !this.isEditable; // Toggle edit mode
  }
  addAddress(){

  }
  addPhoneNumber(){
    
  }
  deleteManager(): void {
    if (this.manager.id && confirm('Are you sure you want to delete this manager?')) {
      this.managerService.deleteManager(this.manager.id).subscribe(
        () => {
          console.log('Manager deleted:', this.manager.id);
          // alert('Manager deleted successfully.');
          this.tostar.success("Success",'Manager deleted successfully',5000);
          window.location.reload(); // Reload the page after deletion
        },
        (error) => {
          console.error('Error deleting manager:', error);
        }
      );
    }
  }
}