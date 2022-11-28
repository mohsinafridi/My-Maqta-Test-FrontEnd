/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductResolveService } from './product-resolve.service';

describe('Service: ProductResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolveService]
    });
  });

  it('should ...', inject([ProductResolveService], (service: ProductResolveService) => {
    expect(service).toBeTruthy();
  }));
});
