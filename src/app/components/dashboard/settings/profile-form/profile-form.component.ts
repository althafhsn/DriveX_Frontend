import { Component,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Manager } from '../../../../models/manager.model';
import { ManagerService } from '../../../../services/manager.service';
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
    private router: Router
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

  toggleEdit(){

  }
  addAddress(){

  }
  addPhoneNumber(){
    
  }
  deleteManager(){

  }
}