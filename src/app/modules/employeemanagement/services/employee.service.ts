import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Employee } from './../models/employee';
import {
  throwError as observableThrowError,
  Observable,
  throwError,
  Subject,
  BehaviorSubject
} from "rxjs";

let baseUrl = 'https://localhost:5003/Employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }


  getEmployeeById(request: any): Observable<any> {
    return this.httpClient
      .get<Employee>(baseUrl + "/" + request, request)
      .pipe(catchError(this.handleError));
  }

  getAllEmployees(): Observable<HttpResponse<Employee>> {
    return this.httpClient.get<any>(baseUrl, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  addEmployee(request: Employee): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(baseUrl, request, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(reuest: Employee): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(baseUrl, reuest, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(request: any) {
    return this.httpClient
      .delete<Employee>(baseUrl + "/" + request, request)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    return observableThrowError(res);
  }
}


