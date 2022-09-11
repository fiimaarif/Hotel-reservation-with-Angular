import { FormGroup } from '@angular/forms';
import { Book } from '../model/book.model';

export interface IBookFormComponent {
  booking?: Book;
  bookingGroup: FormGroup;
  onSubmitReservation(): void;
  onFormReset(): void;
}

export interface IBookListComponent {
  books: Book[];
  onReserve(book: Book): void;
  onCheckIn(bookingId: number): void;
  onCheckOut(bookingId: number): void;
  onDeleteReservation(bookingId: number): void;
}
