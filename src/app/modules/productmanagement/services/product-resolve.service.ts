import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<any> {
  constructor(private productService: ProductService) {}

  resolve(): Observable<any> {
     return this.productService.getProducts().pipe(
      catchError((error) => {
        return of('No Data');
      })
    );
  }
}
