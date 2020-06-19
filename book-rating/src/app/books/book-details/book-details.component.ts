import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, timer, Subscription, Observable } from 'rxjs';
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
    const observable2 = timer(0, 500);
    const observable3 = new Observable(subscriber => {

      subscriber.next('🤠');
      setTimeout(() => subscriber.next('🤡'), 1000);
      const x = setTimeout(() => { subscriber.next('😷'); console.log('Das Licht ist noch an!') }, 5000);
      setTimeout(() => subscriber.complete(), 3000);

      return () => {
        console.log('Wir sollten wirklich mal das Licht ausschalten!');
        clearTimeout(x);
      }
    });

    // 3. Baustein: Subscription
    this.sub = observable3.subscribe(observer);
    setTimeout(() => this.sub.unsubscribe(), 1500);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
