import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
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

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // cookie alert
    // https://www.npmjs.com/package/ngx-cookieconsent
    // https://developers.de/2018/10/29/implementing-cookie-for-angular-app/

    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969',
        },
        button: {
          background: '#ffe000',
          text: '#164969',
        },
      },
      theme: 'classic',
      content: {
        message: 'Az oldal alapvető működéséhez sütiket használunk.',
        dismiss: 'Rendben',
        link: 'Részletek',
        href: '',
      },
    });
  }
}
