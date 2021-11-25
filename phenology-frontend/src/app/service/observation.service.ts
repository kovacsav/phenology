import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observation } from '../model/observation';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService extends BaseService<Observation>  {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'observations';
   }
}
