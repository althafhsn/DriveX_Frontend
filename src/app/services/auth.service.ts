import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUserUrl: string = "http://localhost:5147/api/User/";
  private userPayload:any;
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

  signout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem('token') //!! for convert string in to boolean
  }
  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  

  getfullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
      return this.http.post<any>(`${this.baseUserUrl}refresh`, tokenApi)
  }
}
