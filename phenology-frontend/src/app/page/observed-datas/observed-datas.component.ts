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

  modalStyleDisplay: string = '';
  modalImgageSource: string = '';
  captionText: string = '';

  constructor(
    private observationService : ObservationService,
    public configService: ConfigService
    ) {}

  ngOnInit(): void {
    //console.log(this.observedData$);
    this.backendImageURL = `${this.configService.apiUrl}image/`;
  }

  photoEnlarge(path: string): void {
    this.modalStyleDisplay = "block";
    this.modalImgageSource = path;
    this.captionText = '';
  }

  closePhoto(): void {
    this.modalStyleDisplay = "none";
  }
/*
  // Get the modal
 modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
img = document.getElementById("myImg");
modalImg = document.getElementById("img01");
captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
*/
}
