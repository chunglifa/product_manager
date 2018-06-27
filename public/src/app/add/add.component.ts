import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newProduct: {name: "", price: 0, qty: 0};
  message: any;
  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newProduct = {name: "", price: 0, qty: 0};
    this.message = '';
  }

  onSubmit() {
    const myObservable = this._productService.addProduct(this.newProduct);
    console.log('inside onSubmit() @add.component.ts');
    myObservable.subscribe((server_response) => {
      console.log('111111111server_response at add.component.ts =', server_response);
      if (server_response['status'] === false) {
        console.log('11111111server_response at add.component.ts');
        this.message = server_response;
      } else {
        console.log('111111111success, should redirect', server_response['error']);
        this._router.navigate(['/products']);
      }
    });

  }
}
