import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get data based on resolver
    this.route.data.subscribe((response: any) => {
      this.products = response.products;
    });
  }
}
