import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from 'app/models/book';
import { DataService } from './data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

describe('DataService Test', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  const testBooks: Book[] = [
    { 'bookID': 1, 'title': 'Goodnight Moon', 'author': 'Margaret Wise Brown', 'publicationYear': 1953 },
    { 'bookID': 2, 'title': 'Winnie-the-Pooh', 'author': 'A. A. Milne', 'publicationYear': 1926 },
    { 'bookID': 3, 'title': 'Where the Wild Things Are', 'author': 'Maurice Sendak', 'publicationYear': 1963 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })
    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should GET all books', () => {
    dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => {
          expect(data.length).toBe(3);
        }
      );
    const booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    expect(booksRequest.request.method).toEqual('GET');

    booksRequest.flush(testBooks);
  });

  it('should return a BookTrackerError', () => {
    dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => fail('Success callback should not be called for an error response'),
        (err: BookTrackerError) => {
          expect(err.errorNumber).toEqual(100);
          expect(err.friendlyMessage).toEqual('An error occurred retrieving data.');
        }
      );
    const booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    expect(booksRequest.request.method).toEqual('GET');

    booksRequest.flush('error', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
