import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // VORSICHT
  // erzeugt einen Bug, sobald wir AJAX machen!!
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private br: BookRatingService, private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.bs.getBooks().subscribe(books => this.books = books);
  }

  doRateDown(book: Book) {
    const ratedBook = this.br.rateDown(book);
    this.update(ratedBook);
  }

  doRateUp(book: Book) {
    const ratedBook = this.br.rateUp(book);
    // const ratedBook = {
    //   ...book,
    //   rating: book.rating < 5 ?  ++book.rating : 5
    // };
    this.update(ratedBook);
  }

  update(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }

  addBook(newBook: Book) {
    this.books = [...this.books, newBook];
  }
}
