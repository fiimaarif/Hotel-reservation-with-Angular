import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { HeroComponent } from './hero/hero.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ArticleComponent,
    HeroComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [HomeComponent, AboutComponent, HeroComponent, ArticleComponent],
})
export class HomeModule {}
