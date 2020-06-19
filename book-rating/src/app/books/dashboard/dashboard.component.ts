import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { Store, select } from '@ngrx/store';
import { loadBooks } from '../store/book.actions';
import { selectBooks, selectBooksLoading, selectBookViaIsbn } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  books$ = this.store.pipe(select(selectBooks));
  loading$ = this.store.pipe(select(selectBooksLoading));

  specialBook$ = this.store.pipe(select(selectBookViaIsbn, { isbn: '42' }));

  constructor(private store: Store) {
    this.store.dispatch(loadBooks());

  }

  ngOnInit(): void {
  }

  changeSpecialBook(isbn: string) {
    this.specialBook$ = this.store.pipe(select(selectBookViaIsbn, { isbn }));
  }

  doRateDown(book: Book) {
    // const ratedBook = this.br.rateDown(book);
    // this.update(ratedBook);
  }

  doRateUp(book: Book) {
    // const ratedBook = this.br.rateUp(book);
    // // const ratedBook = {
    // //   ...book,
    // //   rating: book.rating < 5 ?  ++book.rating : 5
    // // };
    // this.update(ratedBook);
  }

  update(ratedBook: Book) {
    // this.books = this.books
    //   .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //   .sort((a, b) => b.rating - a.rating);
  }

  addBook(newBook: Book) {
    // this.books = [...this.books, newBook];
  }
}
