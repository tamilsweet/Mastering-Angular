import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponentList, ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponentList
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
