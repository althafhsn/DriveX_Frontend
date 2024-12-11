import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api-model';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { Customer } from '../models/customer.model';
import { profileCustomer, Address, PhoneNumber} from '../models/profileCustomer.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUserUrl: string = "http://localhost:5147/api/User/";
  private userPayload: any;
  constructor(
    private http: HttpClient,
    private router: Router,

  ) {
    this.userPayload = this.decodeToken()
  }

  signup(userobj: any) {
    return this.http.post<any>(`${this.baseUserUrl}register`, userobj)
  }

  login(loginobj: any) {
    return this.http.post<any>(`${this.baseUserUrl}authenticate`, loginobj)
  }


  changePassword(passwordObj: any) {
    return this.http.post<any>(`${this.baseUserUrl}change-password`, passwordObj)
  }




  getUserInfo() {
    const userId = this.getIdFromToken();
    if (!userId) {
      console.error("User ID is undefined or null. Cannot fetch user info.");
      return of(null); // Return an observable with a default value (e.g., null)
    }
    return this.http.get<any>(`${this.baseUserUrl}customer/${userId}`).pipe(
      catchError((error) => {
        console.error("Error fetching user info:", error);
        return of(null); // Return null or a default value on error
      })
    );
  }
  updateUserInfo(id: string, data: any): Observable<any> {
    const url = `${this.baseUserUrl}${id}/update-profile`;

    // Prepare the request body in the required format
    const requestBody = {
      id: this.getIdFromToken, // The user's ID
      image: data.image || '', // Image field, defaulting to an empty string if not provided
      firstName: data.firstName || '', // First name, defaulting to an empty string if not provided
      lastName: data.lastName || '', // Last name, defaulting to an empty string if not provided
      licence: data.licence || '' // Licence, defaulting to an empty string if not provided
    };

    // Send the PUT request with the formatted data
    return this.http.put<any>(url, requestBody);
  }

  updateAddress(addressId: string, updatedAddress: Address): Observable<any> {
    const url = `${this.baseUserUrl}${addressId}/updateAddress`; // Corrected URL structure
    // Send only the address data, not the id
    const addressPayload = {
      id: updatedAddress.id,
      houseNo: updatedAddress.houseNo,
      street1: updatedAddress.street1,
      street2: updatedAddress.street2,
      city: updatedAddress.city,
      zipCode: updatedAddress.zipCode,
      country: updatedAddress.country
    };

    return this.http.put(url, addressPayload);
  }
  // Add a new address for the customer
  addAddress(customerId: string, address: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}address/${customerId}`, address);
  }
  deleteAddress(addressId: string): Observable<any> {
    const url = `${this.baseUserUrl}${addressId}/deleteAddress`;
    return this.http.delete(url);
  }
  addPhoneNumber(userId: string, phoneNumber: PhoneNumber): Observable<PhoneNumber> {
    const url = `${this.baseUserUrl}${userId}/add-phone-number`;  
    return this.http.post<PhoneNumber>(url, phoneNumber);  
  }
  deletePhoneNumber(phoneNumberId: string): Observable<any> {
    const url = `${this.baseUserUrl}${phoneNumberId}/delete-phone-number`;
    return this.http.delete(url);
  }
  updatePhoneNumber(phoneNumberId: string, phoneNumberData: { mobile1: string }): Observable<any> {
    const url = `${this.baseUserUrl}${phoneNumberId}/update-phone-number`;
    return this.http.put(url, phoneNumberData);
  }
 
  


  






  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
    window.history.pushState(null, '', window.location.href); // Clear the back history
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href); // Block going back
    };
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem('token') //!! for convert string in to boolean
  }
  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getIdFromToken() {
    if (this.userPayload)
      return this.userPayload.nameid;
  }

  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUserUrl}refresh`, tokenApi)
  }
}
