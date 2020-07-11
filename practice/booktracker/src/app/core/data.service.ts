import { Injectable } from '@angular/core';

import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OldBook } from 'app/models/oldBook';
import { map, tap } from 'rxjs/operators';

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

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
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
}
