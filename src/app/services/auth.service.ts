import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api-model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Address, Customer, PhoneNumber } from '../models/customer.model';
import { rentalRequest } from '../models/car.model';

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


  changePassword(passwordObj:any){
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


    placeRentalRequest(requestBody: rentalRequest): Observable<any> {
      const apiUrl = 'http://localhost:5147/api/RentalRequest';
      return this.http.post<any>(apiUrl, requestBody);
    }
    // editUser(userObj : any){
    //   const userId = this.getIdFromToken();
    //   if (!userId) {
    //     console.error("User ID is undefined or null. Cannot edit user info.");
    //     return of(null); // Return an observable with a default value (e.g., null)
    //   }
    //   return this.http.put<any>(`${this.baseUserUrl}${userId}`, userObj)
    // }

    // updateUserAddresses(userId: string, addresses: Address[]) {
    //   return this.http.post<any>(`${this.baseUserUrl}customersAddresses?userId=${userId}`, addresses);
    // }

    // updateUserPhoneNumbers(userId: string, phoneNumbers: PhoneNumber[]) {
    //   return this.http.post<any>(`${this.baseUserUrl}UpdatePhoneNumbers?userId=${userId}`, phoneNumbers);
    // }
    


    updateUserAddresses(addresses: Address[]): Observable<any> {
      return this.getUserInfo().pipe(
        switchMap((userInfo) => {
          if (!userInfo?.id) {
            console.error('Unable to update addresses. User ID is missing.');
            return of(null); // Return an observable with a default value (e.g., null)
          }
          return this.http.post<any>(
            `${this.baseUserUrl}customersAddresses?userId=${userInfo.id}`,
            addresses
          );
        }),
        catchError((error) => {
          console.error('Error updating addresses:', error);
          return of(null); // Return null or a default value on error
        })
      );
    }
  
    updateUserPhoneNumbers(phoneNumbers: PhoneNumber[]): Observable<any> {
      return this.getUserInfo().pipe(
        switchMap((userInfo) => {
          if (!userInfo?.id) {
            console.error('Unable to update phone numbers. User ID is missing.');
            return of(null); // Return an observable with a default value (e.g., null)
          }
          return this.http.post<any>(
            `${this.baseUserUrl}UpdatePhoneNumbers?userId=${userInfo.id}`,
            phoneNumbers
          );
        }),
        catchError((error) => {
          console.error('Error updating phone numbers:', error);
          return of(null); // Return null or a default value on error
        })
      );
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
