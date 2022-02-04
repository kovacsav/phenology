import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/model/plant';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-detailed-plant-guide',
  templateUrl: './detailed-plant-guide.component.html',
  styleUrls: ['./detailed-plant-guide.component.scss']
})
export class DetailedPlantGuideComponent implements OnInit {

  plants$: Observable<Plant[]> = this.plantService.getAll();

  trees: Plant[] =  [new Plant()]
  // <Plant[]> = () => {this.plants$.category;}
  // shrubs
  // herbaceous

  constructor(
    private plantService: PlantService

  ) {
  }

  ngOnInit(): void {
    this.plantService.getAll().subscribe((plants => this.trees=plants.filter(plant => plant.category=='Fák')))
    console.log(this.trees)
  }

  //selectPlant(plant: Plant): void {
  //  this.plants$.plant = plant;
  //}
}
