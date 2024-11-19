import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = 'http://localhost:5147/api/User/all';


  constructor(
    private http : HttpClient
  ) { }

  getAllUser(){
    return this.http.get<any>(this.baseUrl);
  }
}
