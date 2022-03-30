import { Component, OnInit } from '@angular/core';

import { ObservationService } from 'src/app/service/observation.service';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/model/observation';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss']
})
export class ObservedDatasComponent implements OnInit {

  observedData$: Observable<Observation[]> = this.observationService.getAll();
  backendImageURL: string = '';

  constructor(
    private observationService : ObservationService,
    public configService: ConfigService
    ) {}

  ngOnInit(): void {
    //console.log(this.observedData$);
    this.backendImageURL = `${this.configService.apiUrl}image/`;
  }

}
