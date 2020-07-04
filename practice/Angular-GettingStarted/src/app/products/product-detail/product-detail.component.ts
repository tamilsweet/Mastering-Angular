import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail';
  product: IProduct;
  autofocus = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId: number = +this.route.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(product => this.product = product);
    // let productId: number = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
