import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    const myObservable = this._productService.getProducts();
    myObservable.subscribe((server_response) => {
      this.products = server_response['data'];
      console.log('Got products at products.componenet.ts', this.products);
    });
  }

}
