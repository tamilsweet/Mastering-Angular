import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductListComponent } from './product-list.component';
import { ProductResolver } from './product-resolver.service';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [ProductDetailGuard],
    resolve: { resolvedProduct: ProductResolver }
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent,
    canDeactivate: [ProductEditGuard],
    resolve: { resolvedProduct: ProductResolver }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
