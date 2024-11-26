import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword, ResetPasswordMail } from '../models/reset-password-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl: string = "http://localhost:5147/api/User/"

  constructor(
    private http : HttpClient
  ) { }

  sendResetPasswordLink(emailObj: ResetPasswordMail): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}send-reset-email`, emailObj, { headers });
  }
  resetPassword(resetPasswordObj:ResetPassword){
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordObj)
  }
}
