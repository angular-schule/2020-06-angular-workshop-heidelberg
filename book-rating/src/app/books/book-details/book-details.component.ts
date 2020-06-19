import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


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
    const observable1 = of('😎', '🤣', '🤪');
    const observable2 = timer(0, 500).pipe(take(3));

    // 3. Baustein: Subscription
    this.sub = observable2.subscribe(observer);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
