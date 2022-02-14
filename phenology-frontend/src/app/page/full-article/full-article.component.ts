import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.scss']
})
export class FullArticleComponent implements OnInit {

  article$: Observable<Article> = this.activatedRoute.params.pipe(
    switchMap((params) => {
      if (params.id) {
        return this.articleService.get(params.id);
      }
      return of(new Article());

    })
    );

  constructor (
  private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
