import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    return this.productService.getAllProducts().subscribe(
      data => {
        this.products = data.body;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
