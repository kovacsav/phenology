import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { SliderLinksService } from 'src/app/service/slider-links.service';
//import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  article$: Observable<Article[]> = this.articleService
    .getAll()
    .pipe(
      map((item) =>
        item
          .sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 1)
      )
    );

  sliderLinks: {
    id: number;
    iconAlt: string;
    omszLink: string;
    iconPath: string;
    title: string;
  }[] = this.linkService.links;

  constructor(
    private articleService: ArticleService,
    private linkService: SliderLinksService
  ) {}

  ngOnInit(): void {
    // cookie alert
    // https://www.npmjs.com/package/ngx-cookieconsent
    // https://developers.de/2018/10/29/implementing-cookie-for-angular-app/

    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: 'rgb(0, 90, 0)',
        },
        button: {
          background: 'rgb(0, 150, 0)',
          text: 'rgb(255,255,255)',
        },
      },
      theme: 'classic',
      content: {
        message: 'Az oldal alapvető működéséhez sütiket használunk.',
        dismiss: 'Rendben',
        link: '',
        href: '',
      },
    });
  }
}
