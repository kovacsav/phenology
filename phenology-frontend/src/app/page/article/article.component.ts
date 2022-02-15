import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { lastValueFrom } from 'rxjs';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article[]> = this.articleService
    .getAll()
    .pipe(
      map((item) =>
        item.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )
    );

  // Paginator.

  productsProperties: { count: number } = {
    count: 1,
  };
  pageSize: number = 2;
  pageStart: number = 1;
  currentPage: number = 1;
  lastPage: number = 1;

  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (
      let i = 0;
      i < this.productsProperties.count / this.pageSize && pages.length < 10;
      i++
    ) {
      const page = this.pageStart + i;
      pages.push({ page });
      this.lastPage = Math.ceil(this.productsProperties.count / this.pageSize);
    }
    return pages;
  }
  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : index * this.pageSize;
  }
  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.setProductProperties();
  }

  onPaginate(ev: Event, btn: IPageBtn): void {
    ev.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = btn.page - 5 < 1 ? 1 : btn.page - 5;
  }

  onStepPage(ev: Event, step: number): void {
    ev.preventDefault();
    this.currentPage += step;
    this.pageStart = this.currentPage - 2 < 1 ? 1 : this.currentPage - 2;
  }

  async setProductProperties(): Promise<any> {
    this.productsProperties.count = (await lastValueFrom(this.article$)).length;
    console.log(this.productsProperties.count);
  }
}
