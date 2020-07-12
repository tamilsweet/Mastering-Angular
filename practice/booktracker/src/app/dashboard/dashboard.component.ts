import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from 'app/core/data.service';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { BookTrackerError } from 'app/models/bookTrackerError';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
    private title: Title) { }

  ngOnInit() {
    this.dataService.getAllBooks().subscribe(
      (data: Book[]) => this.allBooks = data,
      (err: BookTrackerError) => console.log(err.friendlyMessage),
      () => console.log('complete')
    );
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        () => {
          console.log('Deleted book successfully');
          const index = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      )
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
