import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ArticleService extends BaseService<Article> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http);
    this.entity = 'articles';
  }

}
