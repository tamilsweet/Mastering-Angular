import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditInfoComponent } from './product-edit/info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/info/product-edit-tags.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
