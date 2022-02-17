import { Component, OnInit } from '@angular/core';

import { ObservationService } from 'src/app/service/observation.service';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/model/observation';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss']
})
export class ObservedDatasComponent implements OnInit {

  observedData$: Observable<Observation[]> = this.observationService.getAll();

  constructor(private observationService : ObservationService) { }

  ngOnInit(): void {
    //console.log(this.observation$);
  }

}
