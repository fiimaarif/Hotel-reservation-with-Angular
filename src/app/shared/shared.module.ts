import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScrollDirective } from './directives/scroll/scroll.directive';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { StringFormatService } from './services/string-format.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ScrollDirective,
    ValidationMessageComponent,
  ],
  imports: [CommonModule, RouterModule, ScrollToModule.forRoot()],
  exports: [HeaderComponent, FooterComponent],
  providers: [StringFormatService],
})
export class SharedModule {}
