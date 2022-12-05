import { Component, OnInit } from '@angular/core';
import { ObservationService } from 'src/app/service/observation.service';
import { PlantService } from 'src/app/service/plant.service';
import { observable, Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Observation } from 'src/app/model/observation';
import { Plant } from 'src/app/model/plant';
import { ConfigService } from '../../service/config.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-observed-datas',
  templateUrl: './personal-observed-datas.component.html',
  styleUrls: ['./personal-observed-datas.component.scss'],
})
export class PersonalObservedDatasComponent implements OnInit {
  user: User = new User();
  signedin: boolean = false;

  /* server side pagination
  paginationObject = {
    userId: '',
    location: '',
    plant: '',
    startIndex: 1,
    endIndex: 10,
  };

  totalNumberOfObservations: number = 0;
  loading: boolean = false;
  */

  p: number = 1;
  perPage: number = 10;
  selectedPlant: string = '';

  //selectedPlant: Plant = new Plant();
  //selectedPlant$: BehaviorSubject<Plant | null> =
  //  new BehaviorSubject<Plant | null>(null);

  plantData$: Observable<Plant[]> = this.plantService.getAll().pipe(
    map((item) => [
      new Plant(),
      ...item.sort((a: any, b: any) => {
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
      }),
    ])
  );

  observedData$: Observable<Observation[]> = new Observable<Observation[]>();

  selectedYear: string = '';
  observedYears: (string | null)[] | null = [];

  paginatedData$: Observation[] = [];

  //paginatedData$: Observable<Observation[]> = this.observationService
  //.getPaginatedData(this.paginationObject);

  backendImageURL: string = '';

  modalStyleDisplay: string = '';
  modalImgageSource: string = '';
  captionText: string = '';

  selectedObservationID: string = '';

  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    public configService: ConfigService,
    private authService: AuthService,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.backendImageURL = `${this.configService.apiUrl}image/`;

    this.getObservations();

    this.signedin = this.user.firstName ? true : false;

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

  /*
      getPage(page: number): void {
        this.loading = true;
    this.paginationObject.userId = '';
    this.paginationObject.location = '';
    this.paginationObject.plant = '';
    this.paginationObject.startIndex = (page - 1) * this.perPage;
    this.paginationObject.endIndex =
      this.paginationObject.startIndex + this.perPage;

    console.log('küldöm a kérést:', this.paginationObject);
    this.observationService.getPaginatedData(this.paginationObject).pipe(
      tap((res) => {
        this.p = page;
        this.loading = false;
        //this.totalNumberOfObservations = res.total;
        //this.paginatedData$ = res.observations;
        console.log('response:', res);
      })
    );
      */

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
      }
      */

  getObservations(): void {

    // set user

    this.authService.currentUserSubject$.subscribe({
      next: (user) => {
        this.user.firstName = user?.firstName;
        this.user.email = user?.email;
        if (user) {
          this.observedData$ = this.observationService
            .getPersonalObservations(user._id)
            .pipe(
              map((item) =>
                item.sort(
                  (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
              )
            );
        }
      },
      error: () => {
        this.user.firstName = '';
        this.authService.logout();
      },
    });
  }

  photoEnlarge(path: string): void {
    this.modalStyleDisplay = 'block';
    this.modalImgageSource = path;
    this.captionText = '';
  }

  closePhoto(): void {
    this.modalStyleDisplay = 'none';
  }

  selectObservation(id: string): void {
    this.selectedObservationID = id;
    this.toastrService.success('Rendben', 'A megfigyelés törlése sikeres.', {
      timeOut: 6000,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      progressBar: true
    });
  }

  onDelete(): void {
    /*
    console.log(
      'selectedObservationID:',
      this.selectedObservationID,
      this.user.email
    );
    */
    this.observationService
      .deleteObservation(this.selectedObservationID, this.user.email)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response) {
            // set new accessToken
            //console.log("response:", Object.values(response));
            this.cookieService.set('accessToken', JSON.stringify(response));
            alert('A megfigyelés törlése sikeres.');
            this.toastrService.success('Rendben', 'A megfigyelés törlése sikeres.', {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-bottom-right',
              progressBar: true
            });
            this.getObservations();
          }
        },
        error: (error) => {
          alert('A megfigyelés törlése sikertelen.');
          alert(JSON.stringify(error));
          this.toastrService.error('Hiba történt', 'A megfigyelés törlése sikertelen.', {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-bottom-right',
            progressBar: true
          });
        },
      });
  }
}
