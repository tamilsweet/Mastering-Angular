import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { Reader } from 'app/models/reader';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookTrackerError } from 'app/models/bookTrackerError';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getBookById(id: number): Observable<Book> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'mytoken'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers: headers
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'mytoken'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers: headers
    }).pipe(
      map((book: Book) => <OldBook>{
        bookTitle: book.title,
        year: book.publicationYear
      }),
      tap(classicBook => console.log(classicBook))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'mytoken'
    });

    return this.http.post<Book>('/api/books', newBook, { headers });
  }

  updateBook(book: Book): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'mytoken'
    });

    return this.http.put<void>(`/api/books/${book.bookID}`, book, { headers });
  }

  deleteBook(bookID: number): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'mytoken'
    });

    return this.http.delete<void>(`/api/books/${bookID}`, { headers });
  }

  handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }
}
