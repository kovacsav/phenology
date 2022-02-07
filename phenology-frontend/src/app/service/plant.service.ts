import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../model/plant';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PlantService extends BaseService<Plant> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http);
    this.entity = 'plants';
  }

}
