import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiUrls } from './app.urls';

const AUTH_API = environment.auth_api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
