import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, timer, Subscription, Observable } from 'rxjs';
import { take, map, filter, reduce } from 'rxjs/operators';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  isbn: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(paramMap => this.isbn = paramMap.get('isbn'));

    // 1. Baustein: Observer
    const observer = {
      next: s => console.log(s),
      error: err => console.log('FEHLER', err),
      complete: () => console.log('COMPLETE!')
    };

    // 2. Baustein: Observable
    const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    observable.pipe(
      map(x => x * 10),
      filter(x => x >= 30),
      reduce((a, b) => a + b),
      map(x => '💋'.repeat(x))
    ).subscribe(observer);

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
