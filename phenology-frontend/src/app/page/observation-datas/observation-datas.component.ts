import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/model/observation';
import { Plant } from 'src/app/model/plant';
import { ObservationService } from 'src/app/service/observation.service';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-observation-datas',
  templateUrl: './observation-datas.component.html',
  styleUrls: ['./observation-datas.component.scss'],
  // providers:[DatePipe]
})
export class ObservationDatasComponent implements OnInit {

  observation: Observation = new Observation();
  plants$: Observable<Plant[]> = this.plantService.getAll();
  webcamImage: WebcamImage | null = null;
  observations$: Observable<Observation[]> = this.observationService.getAll();

  // constructor(private datePipe : DatePipe) {
  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    private router: Router
  ) {
    this.observation.date = new Date().toISOString().split('T')[0];
    console.log(new Date().toISOString())
    // this.observation.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // this.plants$.subscribe(plants => plants.forEach(plant=>console.log(plant)))
  }

  ngOnInit(): void {
  }

  save() {
    this.observationService.create(this.observation).subscribe(
      () => this.router.navigate(['/']));
  }

  setPlant(plant: Plant): void {
    this.observation.plant = plant;
  }

  setPhase(phase: string): void {
    this.observation.phase = phase;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    const fileName: string = `${this.observation.date}-${this.observation.plant.name}.png`
    const a = document.createElement('a');
    a.setAttribute('download', fileName);
    a.setAttribute('href', webcamImage.imageAsDataUrl);
    a.click();
    this.observation.photo = fileName;
  }
}
