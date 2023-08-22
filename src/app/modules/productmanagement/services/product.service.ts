import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  throwError as observableThrowError,
  Observable
} from "rxjs";
import { Product } from '../models/product';

let baseUrl = 'https://fakestoreapi.com/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(baseUrl);
  }

  getProductById(id:any): Observable<Product> {    
    return this.httpClient.get<Product>("https://fakestoreapi.com/products/"+id);
  }
}

