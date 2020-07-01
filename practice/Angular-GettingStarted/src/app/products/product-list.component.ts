import { Component } from '@angular/core';
import { Product as IProduct } from './product.model';

@Component({
  selector: 'pm-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  pageTitle = 'Product List';
  showImages = false;
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
  products: IProduct[] = [{
    'productId': 1,
    'productName': 'Leaf Rake',
    'productCode': 'GDN-0011',
    'releaseDate': new Date('March 19, 2019'),
    'description': 'Leaf rake with 48-inch wooden handle.',
    'price': 19.95,
    'starRating': 3.2,
    'imageUrl': 'assets/images/leaf_rake.png'
  },
  {
    'productId': 2,
    'productName': 'Garden Cart',
    'productCode': 'GDN-0023',
    'releaseDate': new Date('March 18, 2019'),
    'description': '15 gallon capacity rolling garden cart',
    'price': 32.99,
    'starRating': 4.2,
    'imageUrl': 'assets/images/garden_cart.png'
  },
  {
    'productId': 5,
    'productName': 'Hammer',
    'productCode': 'TBX-0048',
    'releaseDate': new Date('May 21, 2019'),
    'description': 'Curved claw steel hammer',
    'price': 8.9,
    'starRating': 4.8,
    'imageUrl': 'assets/images/hammer.png'
  }];

  constructor() {
    this.filteredProducts = this.products;
  }

  toggleImages(): void {
    this.showImages = !this.showImages;
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
