import { Component, OnInit } from '@angular/core';
import { ObservationService } from 'src/app/service/observation.service';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Observation } from 'src/app/model/observation';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss']
})
export class ObservedDatasComponent implements OnInit {

  paginationObject = {
    userId: '',
    location: '',
    plant: '',
    startIndex: 1,
    endIndex: 10
  };

  loading: boolean = false;
  p: number = 1;
  perPage: number = 10;
  totalNumberOfObservations: number = 0;

  observedData$: Observable<Observation[]> = this.observationService
  .getAll()
    .pipe(
      map((item) =>
        item.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )
    );

    paginatedData$: Observation[] = [];

    //paginatedData$: Observable<Observation[]> = this.observationService
    //.getPaginatedData(this.paginationObject);

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
    this.getPage(1);
  }

  getPage(page: number): void {
    this.loading = true;
    this.paginationObject.userId = '';
    this.paginationObject.location = '';
    this.paginationObject.plant = '';
    this.paginationObject.startIndex = (page-1) * this.perPage;
    this.paginationObject.endIndex = this.paginationObject.startIndex + this.perPage;

    console.log("küldöm a kérést:", this.paginationObject);
    this.observationService
      .getPaginatedData(this.paginationObject)
      .pipe(
        tap( res => {
          this.p = page;
            this.loading = false;
            //this.totalNumberOfObservations = res.total;
            //this.paginatedData$ = res.observations;
            console.log("response:", res);
        })
      )

        /*
        first())
        .subscribe({
          next: (res) => {
            this.p = page;
            this.loading = false;
            this.totalNumberOfObservations = res.total;
            this.paginatedData$ = res.observations;
            //console.log(this.forgotPasswordStatus);
          },
          error: (error) => {
            alert(JSON.stringify(error));
            //this.router.navigate(['/', 'register']);
          },
        });
        */

}

  photoEnlarge(path: string): void {
    this.modalStyleDisplay = "block";
    this.modalImgageSource = path;
    this.captionText = '';
  }

  closePhoto(): void {
    this.modalStyleDisplay = "none";
  }
}
