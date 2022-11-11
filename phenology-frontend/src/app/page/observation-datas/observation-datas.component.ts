//import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
//import { switchMap } from 'rxjs/operators';
//import { lastValueFrom } from 'rxjs';
import { Observation } from 'src/app/model/observation';
import { Plant } from 'src/app/model/plant';
import { User } from 'src/app/model/user';
import { ObservationService } from 'src/app/service/observation.service';
import { PlantService } from 'src/app/service/plant.service';
import { UserService } from 'src/app/service/user.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CameraComponent } from 'src/app/common/camera/camera.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-observation-datas',
  templateUrl: './observation-datas.component.html',
  styleUrls: ['./observation-datas.component.scss'],
  providers: [CameraComponent],
})
export class ObservationDatasComponent implements OnInit {
  signedin: boolean = false;
  observation: Observation = new Observation();
  observations$: Observable<Observation[]> = this.observationService.getAll();

  currentUser: User = new User();
  userID: string = '';

  maxDate: string = new Date().toISOString().split("T")[0];
  highlightedPlant: string = '';

  // PLANTS

  selectedPlant: Plant = new Plant();
  plants$: Observable<Plant[]> = this.plantService.getAll();
  trees: Plant[] = [new Plant()];
  shrub: Plant[] = [new Plant()];
  herbaceous: Plant[] = [new Plant()];

  // IMAGES

  webcamImage: WebcamImage | null = null;

  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  fileUploadForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  uploadArray: FormGroup[] = [];
  fileNames: string[] = [];
  imgResult: string = '';
  resizedImage: File = {} as File;
  file: any;
  localUrl: any;
  localCompressedUrl: any;
  compressedFiles: any[] = [];
  imgResultBeforeCompress: string = '';
  imgResultAfterCompress: string = '';
  sizeOfOriginalImage: number = 0;
  sizeOFCompressedImage: number = 0;

  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private imageCompress: NgxImageCompressService,
    private cameraComponent: CameraComponent,
    private cookieService: CookieService,
    private auth: AuthService
  ) {
    // console.log('observation',this.user$)
    // this.observation.date = new Date().toISOString().split('T')[0];
    //this.observation.date = new Date().toISOString();
    //console.log('ISOString:', new Date())//.toISOString())
    //console.log('String:', new Date().toString());
    // this.observation.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.plants$.subscribe(plants => plants.forEach(plant=>console.log(plant)))
  }

  ngOnInit(): void {
    //console.log("maxdate:", this.maxDate);
    // authorization and set current user
    this.auth.currentUserSubject$.subscribe({
      next: (user) => {
        this.signedin = user?.firstName ? true : false;
        this.observation.user._id = user?._id || '';
        this.observation.user.email = user?.email || '';
      },
      error: () => {
        this.signedin = false;
      },
    });

    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
      //webcamImage: ''
    });

    // separate plants
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

  // file upload and compress
  // https://medium.com/swlh/compress-image-and-send-it-to-an-api-in-angular-bc48e6ed3835

  setPlant(plant: Plant): void {
    this.observation.plant._id = plant._id;
    //this.setCurrentUser();
    this.selectedPlant = plant;
    this.highlightedPlant = "highlighted";
  }

  setPhase(phase: string): void {
    this.observation.phase = phase;
  }

  selectFile(event: any) {
    var fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl, fileName);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  save(): any {
    //console.log('filenames', this.fileNames);
    //console.log('this.uploadArray', this.uploadArray);

    // handle uploaded files

    this.uploadArray.forEach((file: any, index: number) => {
      if (file) {
        // alert('Please fill valid details!');
        // return false;
        const formData = new FormData();
        // this.pathEvent.emit(this.file);

        this.fileNames[index] = `${Date.now() + index}.jpg`;
        formData.append('uploadedImage', file, this.fileNames[index]);
        formData.append('agentId', '007');

        console.log('formData:', formData);
        //formData.append('filename', this.fileNames[index]);
        this.observation.photo?.push(this.fileNames[index]);
        this.observationService.uploadFile(formData);
      }
    });

    //console.log(this.observation);
    //console.log('hello');

    this.observationService.create(this.observation).subscribe({
      next: (response) => {
        //console.log('response:', response);
        if (response) {
          // set new accessToken

          this.cookieService.set(
            'accessToken',
            JSON.stringify(response));

          alert('Köszönjük! Megfigyelését rögzítettük.');
          this.router.navigate(['/']);
        }
      },
      error: () => {
        //console.log("response error:", Error);
        alert(
          'A felhasználó azonosítása nem sikerült, lehetséges, hogy a rendszer biztonsági okokból a hosszú inaktivitás miatt kiléptette. Kérjük jelentkezzen be újra.'
        );
        this.auth.logout();
        this.router.navigate(['/login']);
      },
    });
  }

  // https://www.npmjs.com/package/ngx-image-compress

  compressFile(image: any, fileName: any) {
    /*
    https://docs.microsoft.com/en-us/uwp/api/windows.storage.fileproperties.photoorientation?view=winrt-22000
    Orientation:
    Normal - 1 - No rotation needed.
    The photo can be displayed using its current orientation.

    Unspecified - 0 - An orientation flag is not set.
    */

    var orientation = 1;

    this.imageCompress
      .compressFile(image, orientation, 90, 100, 800)
      .then((result) => {
        this.imgResultAfterCompress = result;
        this.localCompressedUrl = result;
        this.compressedFiles.push(result);

        // create file from byte
        const imageName = fileName;

        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(
          this.imgResultAfterCompress.split(',')[1]
        );

        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([imageBlob], imageName, {
          type: 'image/jpeg',
        });
        this.fileUploadForm.get('uploadedImage')?.setValue(imageFile);
        this.uploadArray.push(this.fileUploadForm.get('uploadedImage')?.value);
      });
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  setImagePath(fileName: string): void {}

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    const fileName: string = `${this.observation.date}-${this.observation.plant.name}.jpg`;

    this.compressFile(webcamImage.imageAsDataUrl, fileName);
  }

  onRemove(index: any): void {
    console.log(index);
    this.uploadArray.splice(index, 1);
    this.compressedFiles.splice(index, 1);
  }
}
