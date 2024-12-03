import { Component,OnInit} from '@angular/core';
import { Manager } from '../../../models/manager.model';
import { ManagerService } from '../../../services/manager.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
// selectedTab: any;
// onTabSelected($event: string) {
// throw new Error('Method not implemented.');
// }
//   // Active Tab
//   activeTab: string = 'profile-settings'; // Default to 'profile-settings'

//   // Tabs List
//   tabs = [
//     { id: 'profile-settings', label: 'Profile Settings' },
//     { id: 'password-update', label: 'Change Password' },
    
    
//   ];

//   // Method to change tabs
//   changeTab(tabId: string) {
//     this.activeTab = tabId;
//   }
 managers : Manager[] = [];
 selectedManager!:Manager;
 errorMessage: string | null = null;
 isAddManager:boolean = false;



 constructor (private managerservice:ManagerService){

 }
 ngOnInit(): void {
   this.fetchAllManagers();
 }
 fetchAllManagers(): void {
  this.managerservice.getAllManagers().subscribe(
    (data: Manager[]) => {
      this.managers = data;
    },
    (error) => {
      console.error('Error fetching managers:', error);
      this.errorMessage = 'Failed to load manager data.';
    }
  );
}
handleManagerSelection(manager:Manager){
  console.log('mamger selected:',manager);
  this.selectedManager = manager;
  this.isAddManager = false;
}
toggleAddManager():void{
  this.isAddManager=true;
}
}
