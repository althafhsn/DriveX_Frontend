
import { Manager } from '../models/manager.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'http://localhost:5147/api/User'; 

  constructor(private http: HttpClient) {}

  // Fetch all managers
  getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.apiUrl}/all-managers-list`);
  }
  getManagerById(id: string): Observable<Manager> {
    console.log(id);
    return this.http.get<Manager>(`${this.apiUrl}/manger/${id}`);
  }
  addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${this.apiUrl}/add-manager-dashboard`, manager);
  }
  updateManager(manager: Manager): Observable<any> {
    // Dynamically add manager ID to the URL
    console.log(manager.id)
    const url = `http://localhost:5147/api/User/update-manager/${manager.id}`; 
    console.log('Sending request to update manager:', manager); // Log the request
    return this.http.put<any>(url, manager);
  }
  deleteManager(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete-manager/${id}`;
    console.log('Sending DELETE request to URL:', url); // Debug log
    return this.http.delete<any>(url);
  }
}

