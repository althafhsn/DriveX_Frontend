import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel, } from '../models/token-api-model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toast : NgToastService,
    private router : Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse){
          if(err.status === 401){
              return this.handleUnAuthorizedError(req, next)
          }
        }
        return throwError(()=>new Error('Some other Error Occured'))
      })
    );
  }
  handleUnAuthorizedError(req : HttpRequest<any>, next:HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken= this.authService.getToken()!;
    tokenApiModel.refreshToken =this.authService.getRefreshToken()!;
    return this.authService.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.authService.storeRefreshToken(data.refreshToken);
        this.authService.storeToken(data.accessToken)
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        });
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning("Warning", "Session is Expried, Login again", 5000);
            this.router.navigate(['login'])
        })
      })
    )

  }
}
