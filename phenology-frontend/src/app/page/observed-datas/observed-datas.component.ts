import { Component, OnInit } from '@angular/core';
import { ObservationService } from 'src/app/service/observation.service';
import { PlantService } from 'src/app/service/plant.service';
import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
  Observable,
  Subscription,
} from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Observation } from 'src/app/model/observation';
import { Plant } from 'src/app/model/plant';
import { ConfigService } from '../../service/config.service';
//import { ObservedData } from 'src/app/model/observed-data';
//import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-observed-datas',
  templateUrl: './observed-datas.component.html',
  styleUrls: ['./observed-datas.component.scss'],
})
export class ObservedDatasComponent implements OnInit {
  paginationObject = {
    userId: '',
    location: '',
    plant: '',
    startIndex: 1,
    endIndex: 10,
  };

  loading: boolean = false;
  p: number = 1;
  perPage: number = 10;
  totalNumberOfObservations: number = 0;
  selectedPlant: string = '';

  //selectedPlant: Plant = new Plant();
  //selectedPlant$: BehaviorSubject<Plant | null> =
  //  new BehaviorSubject<Plant | null>(null);

  plantData$: Observable<Plant[]> = this.plantService.getAll().pipe(
    map((item) =>
      [new Plant(), ...item.sort((a: any, b: any) => {
        a = a.name.toUpperCase(); // ignore upper and lowercase
        b = b.name.toUpperCase(); // ignore upper and lowercase
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        // names must be equal
        return 0;
      })]
    )
  );

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



  firstObservedYear: string = '';
  lastObservedYear: string = '';
  selectedYear: string = '';


  observedYears: (string | null)[] | null = [];


  paginatedData$: Observation[] = [];

  //paginatedData$: Observable<Observation[]> = this.observationService
  //.getPaginatedData(this.paginationObject);

  backendImageURL: string = '';

  modalStyleDisplay: string = '';
  modalImgageSource: string = '';
  captionText: string = '';

  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    public configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.backendImageURL = `${this.configService.apiUrl}image/`;
    this.observedData$.subscribe((item) => {
      this.observedYears = [
        '',
        ...[
          ...new Set(
            item.map((o) => {
              return o.date ? o.date.slice(0, 4) : o.date;
            })
          ),
        ],
      ];
    });
  }

  getPage(page: number): void {
    this.loading = true;
    this.paginationObject.userId = '';
    this.paginationObject.location = '';
    this.paginationObject.plant = '';
    this.paginationObject.startIndex = (page - 1) * this.perPage;
    this.paginationObject.endIndex =
      this.paginationObject.startIndex + this.perPage;

    //console.log('küldöm a kérést:', this.paginationObject);
    this.observationService.getPaginatedData(this.paginationObject).pipe(
      tap((res) => {
        this.p = page;
        this.loading = false;
        //this.totalNumberOfObservations = res.total;
        //this.paginatedData$ = res.observations;
        //console.log('response:', res);
      })
    );

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
    this.modalStyleDisplay = 'block';
    this.modalImgageSource = path;
    this.captionText = '';
  }

  closePhoto(): void {
    this.modalStyleDisplay = 'none';
  }

  /*
  getFirstAndLastObservationYears(): void {
    this.observedYears = this.observedData$.pipe(
      map(item => {
        item.map((a:any) => {
          a.date
        })
      })
    )
  }
  */
}
