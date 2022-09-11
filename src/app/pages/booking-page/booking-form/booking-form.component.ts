import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { IBookFormComponent } from '../interface/booking.interface';
import { BookField } from '../model/booking-field.model';
import { Book, Guest } from '../model/book.model';
import { HotelService } from '../services/hotel.service';

const BOOK_URL = '/booking/list';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit, IBookFormComponent {
  book?: Book;
  id?: number;
  fee = environment.nightlyFee;

  field: typeof BookField = BookField;

  bookingGroup: FormGroup = new FormGroup({
    [BookField.ID]: new FormControl(null),
    [BookField.NAME]: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    [BookField.EMAIL]: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    [BookField.PHONE]: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(13),
    ]),
    [BookField.ROOM_NUMBER]: new FormControl(null, [Validators.required]),
    [BookField.DURATION]: new FormControl(null, [Validators.required]),
    [BookField.GUEST_COUNT]: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          return params['id'] ? +params['id'] : null;
        })
      )
      .subscribe((id: any) => {
        this.hotelService.get(id).subscribe({
          next: (book) => (this.book = book),
        });
        this.id = id;
        this.setFormValue();
      });
  }

  onSubmitReservation(): void {
    const guest: Guest = {
      name: this.bookingGroup.value.name,
      id: this.bookingGroup.value.id,
      email: this.bookingGroup.value.email,
      phone: this.bookingGroup.value.phone,
    };
    const book: Book = {
      id: this.bookingGroup.value.id,
      status: this.book?.status || 'reserved',
      roomNumber: this.bookingGroup.value.roomNumber,
      duration: this.bookingGroup.value.duration,
      guestCount: this.bookingGroup.value.guestCount,
      reservee: guest,
    };
    this.hotelService.save(book).subscribe();
    if (this.id) {
      Swal.fire({
        icon: 'success',
        title: `Booking Atas Nama ${book.reservee.name} Telah Diubah`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire(
        `Tamu ${book.reservee.name} Telah Melakukan Pemesanan Untuk Kamar ${
          book.roomNumber
        } Selama ${book.duration} Malam Dengan Total Tagihan Sebesar ${
          book.duration * this.fee
        }`
      );
    }
    this.bookingGroup.reset();
    this.router.navigateByUrl(BOOK_URL);
  }

  setFormValue(): void {
    if (this.book) {
      this.bookingGroup.get(BookField.ID)?.setValue(this.book.id);
      this.bookingGroup.get(BookField.NAME)?.setValue(this.book.reservee.name);
      this.bookingGroup
        .get(BookField.EMAIL)
        ?.setValue(this.book.reservee.email);
      this.bookingGroup
        .get(BookField.PHONE)
        ?.setValue(this.book.reservee.phone);
      this.bookingGroup
        .get(BookField.ROOM_NUMBER)
        ?.setValue(this.book.roomNumber);
      this.bookingGroup.get(BookField.DURATION)?.setValue(this.book.duration);
      this.bookingGroup
        .get(BookField.GUEST_COUNT)
        ?.setValue(this.book.guestCount);
    } else {
      this.bookingGroup.reset();
    }
  }

  isValid(controlName: BookField) {
    const control: AbstractControl | null = this.bookingGroup.get(controlName);
    let classCss: string = '';
    if (control && control.touched && control.invalid) {
      classCss = 'is-invalid';
    } else if (control && control.valid) {
      classCss = 'is-valid';
    } else {
      classCss = '';
    }
    return classCss;
  }

  onFormReset(): void {
    throw new Error('Method not implemented.');
  }
}
