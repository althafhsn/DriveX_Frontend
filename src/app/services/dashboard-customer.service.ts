import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerService {

  private dashboardAllCustomers: string = "http://localhost:5147/api/User/all-customers-list"

  constructor(private http : HttpClient) { }

  DashboardAllCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.dashboardAllCustomers);
  }


}
