import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/new',
    component: AddComponent
  },
  {
    path: 'products/:id',
    component: DetailsComponent
  },
  {
    path: 'products/:id/edit',
    component: EditComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
