import { Component, OnInit } from '@angular/core';

import { ObservedDataService } from 'src/app/service/observed-data.service';
import { Observable } from 'rxjs';
import { ObservedData } from 'src/app/model/observed-data';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss']
})
export class ObservedDatasComponent implements OnInit {

  observedData$: Observable<ObservedData[]> = this.observedDataService.getAll();

  constructor(private observedDataService : ObservedDataService) { }

  ngOnInit(): void {
    //console.log(this.observation$);
  }

}
