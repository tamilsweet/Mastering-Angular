export interface Product {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  tags: string[];
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
