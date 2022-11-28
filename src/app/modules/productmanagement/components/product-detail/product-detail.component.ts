import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  product: Product;
  id: number;
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];       
    this.getProductById(id);
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      console.log(data);
      this.product = data;
    });
  }

}
