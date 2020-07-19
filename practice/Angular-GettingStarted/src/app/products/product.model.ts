export interface IProduct {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  tags: string[];
}

export class Product {
  constructor(
    public id = 0,
    public productName = '',
    public productCode = '',
    public releaseDate = '',
    public description = '',
    public price = 0,
    public starRating = 5.0,
    public imageUrl = '',
    public tags = []
  ) { }
}
