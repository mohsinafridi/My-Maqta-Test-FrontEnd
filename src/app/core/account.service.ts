import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// const AUTH_API = 'http://localhost:8080/api/auth/';

// Non Deployed
const AUTH_API = "https://localhost:5000/account";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AccountService {
 
constructor(private http:HttpClient) { }

login(username: string, password: string): Observable<any> {  
  return this.http.post(AUTH_API, {
    username,
    password
  }, httpOptions);
}

register(username: string, email: string, password: string): Observable<any> {
  return this.http.post('signup', {
    username,
    email,
    password
  }, httpOptions);
}
}