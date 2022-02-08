import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/model/plant';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-detailed-plant-guide',
  templateUrl: './detailed-plant-guide.component.html',
  styleUrls: ['./detailed-plant-guide.component.scss'],
})
export class DetailedPlantGuideComponent implements OnInit {

  plants$: Observable<Plant[]> = this.plantService.getAll();

  trees: Plant[] = [new Plant()];
  shrub: Plant[] = [new Plant()];
  herbaceous: Plant[] = [new Plant()];

  constructor(private plantService: PlantService) {}


  // Leszűrjük a növényeket, hogy kategória szerint
  // tudjuk megjeleníteni
  // ezek után név szerint rendezzük a tömböket:

  ngOnInit(): void {
    this.plantService.getAll().subscribe((plants) => {
      (this.trees = plants.filter((plant) => plant.category == 'Fák')).sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
      );
      (this.shrub = plants.filter((plant) => plant.category == 'Cserjék')).sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
      );
      (this.herbaceous = plants.filter(
        (plant) => plant.category == 'Lágyszárúak'
      )).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    });
  }


}
