import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  product: any;
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
  }
  findProduct(id) {
    console.log('findProduct() @profile.component.ts with id =>', this.id);
    const observable = this._productService.findProduct(this.id);
    observable.subscribe((server_response) => {
      console.log('profile.component.ts brough back this pet', server_response);
      this.product = server_response['data'];
    });
  }
  delete() {
    console.log('delete() @profile.component.ts with id =>', this.id);
    const observable = this._productService.delete(this.id);
    observable.subscribe((server_response) => {
      console.log('server response =>', server_response);
      if (server_response['status'] === false) {
        console.log('error deleting product @profile.component.ts', server_response);
      } else {
        console.log('successfully deleted product @profile.component.ts', server_response);
        this._router.navigate(['/products']);
      }
    });
  }

}
