import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Book } from '../model/book.model';

const BOOKING_KEY = 'books';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  books: Book[] = [];
  fee = environment.nightlyFee;

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      try {
        const bookingValue: string = this.sessionService.get(BOOKING_KEY);
        const books: Book[] = bookingValue ? JSON.parse(bookingValue) : [];
        this.books = books;
        this.updateSessionStorage();
        observer.next(books);
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        observer.next(this.books.find((book) => book.id === bookingId) as Book);
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  save(book: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (!book.id) {
          book.id = this.books.length + 1;
          this.books.push(book);
        } else {
          this.books = this.books.map((item) => {
            if (item.id === book.id) {
              item = book;
            }
            return item;
          });
        }
        this.updateSessionStorage();
        observer.next();
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.books = this.books.map((book) => {
          if (book.id === bookingId) {
            if (book.status == 'reserved') {
              Swal.fire(
                `Tamu ${book.reservee.name} sudah check-in pada kamar ${book.roomNumber}!`
              );
              book.status = 'checked-in';
            } else {
              Swal.fire({
                icon: 'error',
                title: `Tamu sudah ${book.status}`,
              });
            }
          }
          return book;
        });
        this.updateSessionStorage();
        observer.next();
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.books = this.books.map((book) => {
          if (book.id === bookingId) {
            if (book.status == 'checked-in') {
              Swal.fire(
                `Tamu ${book.reservee.name} sudah check-out pada kamar ${book.roomNumber}!`
              );
              book.status = 'checked-out';
            } else if (book.status == 'reserved') {
              Swal.fire({
                icon: 'error',
                title: 'Silahkan Check-in Terlebih Dahulu',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: ` Sudah ${book.status}`,
              });
            }
          }
          return book;
        });
        this.updateSessionStorage();
        observer.next();
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  remove(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        const bookId: number = this.books.findIndex(
          (item) => item.id == bookingId
        );
        this.books.splice(bookId, 1);
        this.updateSessionStorage();
        observer.next();
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  reserve(book: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (book.status === 'checked-out') {
          Swal.fire({
            icon: 'error',
            title: `Tidak dapat diubah karena sudah ${book.status}`,
          });
        } else {
          this.router.navigateByUrl(`/booking/form/${book.id}`);
        }
        observer.next();
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    });
  }

  private updateSessionStorage(): void {
    this.sessionService.set(BOOKING_KEY, JSON.stringify(this.books));
  }
}
