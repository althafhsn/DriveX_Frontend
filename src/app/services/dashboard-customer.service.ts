import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerResponse } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerService {

  private dashboardAllCustomers: string = "http://localhost:5147/api/User/all-customers-list";
  private addCustomerUrl: string = "http://localhost:5147/api/User/add-customer-dashboard";
  private updateCustomerUrl = 'http://localhost:5147/api/User/';
  private baseUrl = 'http://localhost:5147/api/User';

  constructor(private http : HttpClient) { }

  DashboardAllCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.dashboardAllCustomers);
  }
  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(this.addCustomerUrl, customer);
  }
  updateCustomer(customer: Customer): Observable<any> {
    // Dynamically add customer ID to the URL
    const url = `${this.updateCustomerUrl}${customer.id}`;  // Assuming customer has an 'id' property
    console.log('Sending request to update customer:', customer);  // Log the request
    return this.http.put<any>(url, customer);
    
  }
  getCustomerById(id: string): Observable<Customer> {
    // Use the correct endpoint structure
    const url = `http://localhost:5147/api/User/customer/${id}`;
    return this.http.get<Customer>(url);
  }

  getCustomerWithRentalInfo(customerId: string): Observable<CustomerResponse> {
    const url = `${this.baseUrl}/GetCustomerWithRentalInfo/${customerId}`;
    return this.http.get<CustomerResponse>(url);
  }
  deleteCustomerById(customerId: string): Observable<void> {
    const url = `${this.baseUrl}/deleteCustomer/${customerId}`;
    return this.http.delete<void>(url);
  }
  
}
