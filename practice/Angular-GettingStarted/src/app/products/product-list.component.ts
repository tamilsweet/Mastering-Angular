import { Component, OnInit } from '@angular/core';
import { IProduct as IProduct } from './product.model';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  showImage = false;
  imageWidth = 50;
  imageMargin = 2;
  rating = '';

  set quantity(value: number) {
    this.recalculate(value);
  }

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    }, err => {
      this.errorMessage = err;
    });
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
  }

  toggleImages(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => {
      return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  recalculate(value: number) {
    return value;
  }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }
}
