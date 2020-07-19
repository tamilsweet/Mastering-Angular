import { Injectable } from '@angular/core';
import { IProduct, Product } from './product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { tap, catchError, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('getProduct', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  initializeProduct(): IProduct {
    return new Product() as IProduct;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
