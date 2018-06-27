import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  product: any;
  product_backlog2: any;
  message: any;
  constructor(
    route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.id = route.snapshot.params['id'];
    console.log('loaded profile with product id=>', this.id);
   }

  ngOnInit() {
    this.findProduct(this.id);
    this.message = '';
  }
  findProduct(id) {
    console.log('findProduct() @profile.component.ts with id =>', this.id);
    const observable = this._productService.findProduct(this.id);
    observable.subscribe((server_response) => {
      console.log('profile.component.ts brough back this product', server_response);
      this.product = server_response['data'];
      const product_backlog = server_response['data'];
      this.product_backlog2 = product_backlog;
    });
  }
  onSubmit() {
    console.log('onSubmit(), with pet data', this.product, 'and id', this.id);
    const observable = this._productService.update(this.id, this.product);
    observable.subscribe((server_response) => {
      console.log('server_response', server_response);
      if (server_response['status'] === false) {
        console.log(server_response);
        this.message = server_response['message'];
      } else {
        console.log(server_response);
        this.message = server_response['message'];
        this._router.navigate(['/products']);
      }
    });

  }
  resetProduct() {
    console.log('Inside resetProduct()');
    console.log('this.product =>', this.product);
    const observable = this._productService.findProduct(this.id);
    observable.subscribe((server_response) => {
      console.log('profile.component.ts brough back this product', server_response);
      this.product = server_response['data'];
    });

  }

}
