import { Component, OnInit, Input } from '@angular/core';
import { Plant } from 'src/app/model/plant';
import { PlantService } from 'src/app/service/plant.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-individual-plant-guide',
  templateUrl: './individual-plant-guide.component.html',
  styleUrls: ['./individual-plant-guide.component.scss']
})
export class IndividualPlantGuideComponent implements OnInit {

//  @Input() plant: Plant= new Plant;

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private location: Location) { }

    ngOnInit(): void {
    //  this.getPlant();
    }



}
