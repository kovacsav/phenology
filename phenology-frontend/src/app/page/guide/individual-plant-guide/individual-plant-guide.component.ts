import { Component, OnInit, Input } from '@angular/core';
import { Plant } from 'src/app/model/plant';
import { PlantService } from 'src/app/service/plant.service';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-individual-plant-guide',
  templateUrl: './individual-plant-guide.component.html',
  styleUrls: ['./individual-plant-guide.component.scss'],
})
export class IndividualPlantGuideComponent implements OnInit {

//  @Input() plant$: Plant = new Plant();


  plant$: Observable<Plant> = this.activatedRoute.params.pipe(
      switchMap((params) => {
        if (params._id) {
          return this.plantService.get(params._id);
        }
        return of(new Plant());

      })
      );


     constructor(
       private plantService: PlantService,
       private activatedRoute: ActivatedRoute,
       private router: Router,
       private location: Location

       ) {}

   ngOnInit(): void {
    //  this.getPlant();
  }
}

