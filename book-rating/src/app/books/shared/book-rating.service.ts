import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  readonly minRating = 1;
  readonly maxRating = 5;
  readonly steps = 1;

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < this.maxRating ? book.rating + this.steps : this.maxRating
    };
  }

  rateDown(book: Book): Book {
    const rating = Math.max(book.rating - this.steps, this.minRating);
    return {
      ...book,
      rating
    };
  }
}
