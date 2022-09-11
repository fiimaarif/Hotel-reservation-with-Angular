import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective {
  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(): void {
    let element = document.querySelector('#header') as HTMLElement;
    if (window.pageYOffset > 100) {
      alert('scrolled');
      element.classList.add('bg-pascal');
    } else {
      element.classList.remove('bg-pascal');
    }
  }

  constructor() {}
}
