import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BookComponent } from './book/book.component';
import { BooksRoutingModule } from './books-routing.module';
import { CreateBookComponent } from './create-book/create-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToArrayPipe } from './shared/to-array.pipe';
import { BookDetailsComponent } from './book-details/book-details.component';
import { StoreModule } from '@ngrx/store';
import * as fromBook from './store/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/book.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    BookComponent,
    ToArrayPipe,
    CreateBookComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromBook.bookFeatureKey, fromBook.reducer),
    EffectsModule.forFeature([BookEffects])
  ],
  exports: [
    DashboardComponent
  ]
})
export class BooksModule { }
