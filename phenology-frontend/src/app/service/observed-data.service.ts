import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservedData } from '../model/observed-data';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class ObservedDataService extends BaseService<ObservedData>  {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'observations';
  }

}
