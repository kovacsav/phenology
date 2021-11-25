import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'users';
  }

  query(queryString: string): Observable<User | User[] | any> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<User[]>(url);
  }

}
