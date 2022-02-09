import { Component, OnInit } from '@angular/core';
import { Observation } from 'src/app/model/observation';
import { ObservationService } from 'src/app/service/observation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss']
})
export class ObservedDatasComponent implements OnInit {

  observation$: Observable<Observation[]> = this.observationService.getAll();

  constructor(private observationService: ObservationService) { }

  ngOnInit(): void {
    console.log(this.observation$);
  }

}
