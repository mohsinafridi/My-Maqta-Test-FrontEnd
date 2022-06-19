import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import {
  throwError as observableThrowError,
  Observable
} from "rxjs";
import { Product } from '../models/product';

let baseUrl = 'https://localhost:5003/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  getAllProducts(): Observable<HttpResponse<Product>> {
    return this.httpClient.get<any>(baseUrl, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    return observableThrowError(res);
  }
}

