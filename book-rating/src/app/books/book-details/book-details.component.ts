import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, timer, Subscription, Observable, forkJoin } from 'rxjs';
import { take, map, filter, reduce, repeat, concatMap, mergeMap, switchMap, share, shareReplay, catchError, retry, tap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  showDetails = false;

  book$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('isbn')),
    switchMap(isbn => forkJoin(
      [
        this.bs.getSingleBook(isbn).pipe(
          retry(3),
          catchError((err: HttpErrorResponse) => of({
            isbn: '???',
            title: 'Fehler',
            description: err.message
          }))
        ),
        this.bs.getBooks()
      ])),
    tap(([book, books]) => console.log(book, books)),
    // tap(arr => console.log(arr[0], arr[1])),
    map(([book]) => book)
  );

  constructor(
    private route: ActivatedRoute,
    private bs: BookStoreService) {
  }
}
