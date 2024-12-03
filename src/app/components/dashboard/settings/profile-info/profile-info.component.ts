import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Manager } from '../../../../models/manager.model';
import { ManagerService } from '../../../../services/manager.service';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
  @Input() managers: Manager[] = [];
  @Output() addManager = new EventEmitter<void>(); // Output property for add action
  @Output() managerSelected = new EventEmitter<Manager>(); // Output property for manager selection
  errorMessage: string | null = null;
  @Input() searchText: string = '';
  selectedManager: Manager | null = null;


  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.fetchAllManagers();
  }
  
  fetchAllManagers(): void {
    this.managerService.getAllManagers().subscribe(
      (data: Manager[]) => {
        this.managers = data;
      },
      (error) => {
        console.error('Error fetching managers:', error);
        this.errorMessage = 'Failed to load manager data.';
      }
    );
  }
  onManagerClick(manager: Manager): void {
    if (manager && manager.id) {
      this.managerService.getManagerById(manager.id).subscribe(
        (response) => {
          console.log('Manager details:', response);
          this.selectedManager = response; // Store the response
          this.managerSelected.emit(response); // Emit the selected manager details
        },
        (error) => {
          console.error('Error fetching manager details:', error);
          this.errorMessage = 'Failed to load manager details.';
        }
      );
    }
  }
}