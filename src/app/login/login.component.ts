import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
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
    this.accountService.login('admin', 'admin').subscribe({
      next: (data) => {
        debugger;
        this.tokenStorage.saveToken(data.jwtToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().userName;
      },
      error: (err) => {
        this.router.navigate(['./book/list']);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
