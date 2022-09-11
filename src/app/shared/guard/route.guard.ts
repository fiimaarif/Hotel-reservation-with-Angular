import { Injectable } from '@angular/core';
import { StateKey } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Params,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authorize(state);
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authorize(state);
  }

  protected redirectToLogin(queryParams?: Params): void {
    this.router.navigate(['auth', 'login'], { queryParams }).finally();
  }

  private authorize(state: RouterStateSnapshot): boolean {
    const params: Params = { next: state.url };
    const authorize: boolean = this.sessionService.get('token') !== null;

    if (!authorize) {
      Swal.fire({
        icon: 'error',
        title: 'Oopss..',
        text: 'Silahkan Login Terlebih Dahulu',
      });
      this.redirectToLogin(params);
    }
    const menus = [
      {
        id: 1,
        name: 'booking-list',
        location: 'booking/list',
      },
      {
        id: 2,
        name: 'bookin-form',
        location: 'booking/form',
      },
    ];
    return menus.some((m) => {
      return state.url.indexOf(m.location) > -1;
    });
  }
}
