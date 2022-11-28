import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book';
import {
  throwError as observableThrowError,
  Observable,
} from "rxjs";

let baseUrl = 'https://localhost:5000/Book';

@Injectable({
  providedIn: 'root'
})


export class BookService {

  
  constructor(private httpClient: HttpClient) { }


  getBooks(): Observable<HttpResponse<Book>> {
    return this.httpClient.get<any>(baseUrl, { observe: "response" })
      .pipe(catchError(this.handleError));
  }
  

  addBooke(request: Book): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(baseUrl, request, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  getBookById(request: any): Observable<any> {
    return this.httpClient
      .get<Book>(baseUrl + "/" + request, request)
      .pipe(catchError(this.handleError));
  }

  deleteBookById(request: any): Observable<any> {
    console.log(baseUrl + "?id=" + request);
    return this.httpClient
      .delete<Book>(baseUrl + "?id=" + request)
      .pipe(catchError(this.handleError));
  }
  addBook(request: Book): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(baseUrl, request, { observe: "response" })
      .pipe(catchError(this.handleError));
  }
  
  updateBook(reuest: Book): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(baseUrl, reuest, { observe: "response" })
      .pipe(catchError(this.handleError));
  }
  private handleError(res: HttpErrorResponse | any) {
    return observableThrowError(res);
  }
}

