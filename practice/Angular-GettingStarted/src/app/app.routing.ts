import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [ProductDetailGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
