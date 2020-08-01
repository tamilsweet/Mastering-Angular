import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
