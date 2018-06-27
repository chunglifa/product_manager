import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit() {
  }
  // FUNCTIONS:
  getProducts() {
    console.log('getProducts() @ product.service.ts');
    return this._http.get('/get/products');
  }
  addProduct(newProduct) {
    console.log('add.component.ts => pet.service.ts with data', newProduct);
    return this._http.post('/post/new', newProduct);
  }
  findProduct(id) {
    console.log('findPet() @ pet.service.ts with id =>', id);
    return this._http.get('/get/product/' + id);
  }
  delete(id) {
    console.log('delete() @ pet.service.ts using ID =>', id);
    return this._http.delete('/delete/' + id);
  }
  update(id, product) {
    console.log('update() @ pet.service.ts with pet id', id, 'and pet data', product);
    return this._http.put('/update/' + id, product);
  }

}
