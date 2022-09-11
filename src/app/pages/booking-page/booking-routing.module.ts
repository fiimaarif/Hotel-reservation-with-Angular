import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from 'src/app/shared/guard/route.guard';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: BookingListComponent,
  },
  {
    path: 'form',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: BookingFormComponent,
  },
  {
    path: 'form/:id',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: BookingFormComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
