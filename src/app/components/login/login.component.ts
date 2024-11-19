import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  public resetPaswordEmail!: string;
  public isValidEmail!:boolean;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  hideShowPassword(): void {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.auth.login({ username, password })
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken)
            const tokenPayload = this.auth.decodeToken();
            this.userStore.setFullName(tokenPayload.unique_name);
            this.userStore.setRoleFromStore(tokenPayload.role);
            this.toast.success("SUCCESS", "Login was Successed", 5000);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.toast.danger("ERROR", "Login was Failed", 5000)

          }
        });
    } else {
      validateForm.validateAllFormFields(this.loginForm);
      alert('Form is invalid');
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPaswordEmail)){
      console.log(this.resetPaswordEmail);
      this.resetPaswordEmail ='';
      const buttonRef = document.getElementById('closeBtn' )
      buttonRef?.click();
    }
  }
}
