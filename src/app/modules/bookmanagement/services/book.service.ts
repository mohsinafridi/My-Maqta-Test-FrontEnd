import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IBook } from '../models/book';
import { throwError as observableThrowError, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

let bookUrl = environment.api_base_url + 'Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<HttpResponse<IBook>> {
    return this.httpClient
      .get<any>(bookUrl, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  addBooke(request: IBook): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(bookUrl, request, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  getBookById(request: any): Observable<any> {
    return this.httpClient
      .get<IBook>(bookUrl + '/' + request, request)
      .pipe(catchError(this.handleError));
  }

  deleteBookById(request: any): Observable<any> {
    return this.httpClient
      .delete<IBook>(bookUrl + '?id=' + request)
      .pipe(catchError(this.handleError));
  }
  addBook(request: IBook): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(bookUrl, request, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  updateBook(reuest: IBook): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(bookUrl, reuest, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
  private handleError(res: HttpErrorResponse | any) {
    return observableThrowError(res);
  }
}
