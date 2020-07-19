import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IProduct } from './product.model';

export class ProductData implements InMemoryDbService {
  createDb() {
    const products: IProduct[] = [
      {
        'id': 1,
        'productName': 'Leaf Rake',
        'productCode': 'GDN-0011',
        'releaseDate': 'March 19, 2019',
        'description': 'Leaf rake with 48-inch wooden handle.',
        'price': 19.95,
        'starRating': 3.2,
        'imageUrl': 'assets/images/leaf_rake.png',
        'tags': ['rake', 'leaf', 'yard', 'home']
      },
      {
        'id': 2,
        'productName': 'Garden Cart',
        'productCode': 'GDN-0023',
        'releaseDate': 'March 18, 2019',
        'description': '15 gallon capacity rolling garden cart',
        'price': 32.99,
        'starRating': 4.2,
        'imageUrl': 'assets/images/garden_cart.png',
        'tags': ['garden', 'cart']
      },
      {
        'id': 5,
        'productName': 'Hammer',
        'productCode': 'TBX-0048',
        'releaseDate': 'May 21, 2019',
        'description': 'Curved claw steel hammer',
        'price': 8.9,
        'starRating': 4.8,
        'imageUrl': 'assets/images/hammer.png',
        'tags': ['hammer', 'steel']
      },
      {
        'id': 8,
        'productName': 'Saw',
        'productCode': 'TBX-0022',
        'releaseDate': 'May 15, 2019',
        'description': '15-inch steel blade hand saw',
        'price': 11.55,
        'starRating': 3.7,
        'imageUrl': 'assets/images/saw.png',
        'tags': ['saw', 'blade']
      },
      {
        'id': 10,
        'productName': 'Video Game Controller',
        'productCode': 'GMG-0042',
        'releaseDate': 'October 15, 2018',
        'description': 'Standard two-button video game controller',
        'price': 35.95,
        'starRating': 4.6,
        'imageUrl': 'assets/images/xbox-controller.png',
        'tags': ['video', 'game', 'controller']
      }
    ];
    return { products };
  }
}
