import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { OldBook } from 'app/models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    const bookID: number = +this.route.snapshot.params['id'];
    this.dataService.getBookById(bookID)
      .subscribe(
        (book: Book) => this.selectedBook = book,
        (err: any) => console.log(err),
        () => console.log(`Details for book ${bookID} fetched.`)
      );

    this.dataService.getOldBookById(bookID)
      .subscribe(
        (oldBook: OldBook) => console.log(oldBook)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
