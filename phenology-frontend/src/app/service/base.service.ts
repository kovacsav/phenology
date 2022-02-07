import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
// export class BaseService<T extends { active?: boolean, _id?: string, price?: number }>  {
export class BaseService<T>  {

  entity: string = '';

  constructor(
    public config: ConfigService,
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entity}`);
  };

  get(_id: string): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${_id}`);
  }

  //getPlantCategory(category: string): Observable<T>[] {
  //  return this.http.get<T[]>(`${this.config.apiUrl}${this.entity.category}`);
  //}

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.config.apiUrl}${this.entity}`, entity);
  };
}
