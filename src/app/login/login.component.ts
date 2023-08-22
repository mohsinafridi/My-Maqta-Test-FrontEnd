import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';
import { TokenStorageService } from '../core/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private tokenStorage: TokenStorageService,    
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    const { username, password } = this.form;
    this
    .accountService
    .login(username, password)
    .subscribe({            
      next: (data) => { 
        this.tokenStorage.saveToken(data?.jwtToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles =  data?.userName; //this.tokenStorage.getUser().roles;
        this.router.navigate(['./employee/list']);
      },
      error: (err) => {
        this.router.navigate(['./employee/list']);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
