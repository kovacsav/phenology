import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

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
        item.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 1)
      )
    );

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}
}
