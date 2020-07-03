import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product';
  product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
