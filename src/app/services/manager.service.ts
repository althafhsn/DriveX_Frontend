
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
    return this.http.get<Manager>(`${this.apiUrl}/manager/${id}`);
  }
  addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${this.apiUrl}/add-manager-dashboard`, manager);
  }
}

