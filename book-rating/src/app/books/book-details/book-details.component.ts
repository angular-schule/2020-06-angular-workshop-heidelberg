import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, timer, Subscription, Observable } from 'rxjs';
import { take, map, filter, reduce, repeat, concatMap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  isbn$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('isbn'))
  );



  constructor(private route: ActivatedRoute, private bs: BookStoreService) {

  // ANTI PATTERN!!!!

    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('isbn')),
      map(isbn => this.bs.getSingleBook(isbn))
    )
    .subscribe(book$ => book$.subscribe(
      book => console.log(book))
    );
  }



}
