import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Observation } from 'src/app/model/observation';
import { Plant } from 'src/app/model/plant';
import { User } from 'src/app/model/user';
import { ObservationService } from 'src/app/service/observation.service';
import { PlantService } from 'src/app/service/plant.service';
import { UserService } from 'src/app/service/user.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CameraComponent } from 'src/app/common/camera/camera.component';

@Component({
  selector: 'app-observation-datas',
  templateUrl: './observation-datas.component.html',
  styleUrls: ['./observation-datas.component.scss'],
  providers:[CameraComponent]
})
export class ObservationDatasComponent implements OnInit {
  //  @Input() user: User = new User;

  selectedPlant: Plant = new Plant();
  plants$: Observable<Plant[]> = this.plantService.getAll();

  webcamImage: WebcamImage | null = null;

  observation: Observation = new Observation();
  observations$: Observable<Observation[]> = this.observationService.getAll();

  // kell nekünk a bejelentkezett user összes adata
  userString: string = localStorage.getItem('currentUser') || '';

  allUser$: Observable<User[]> = this.userService.getAll();
  currentUser$: Observable<User> = this.userService
    .getAll()
    .pipe(
      switchMap((users) =>
        users.filter((user) => user.email === JSON.parse(this.userString).email)
      )
    );

  currentUser: User = new User();

  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput: ElementRef<HTMLInputElement> = {} as ElementRef;
  fileUploadForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  uploadArray: FormGroup[] = [];
  // fileInputLabel: any = '';
  // @Output() pathEvent: EventEmitter<string> = new EventEmitter<string>();
  fileNames: string[] = [];

  userID: string = '';

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


  // user$: BehaviorSubject<User | null> = this.authService.currentUserSubject$

  // constructor(private datePipe : DatePipe) {
  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private imageCompress: NgxImageCompressService,
    private cameraComponent: CameraComponent
  ) {
    // console.log('observation',this.user$)
    // this.observation.date = new Date().toISOString().split('T')[0];
    this.observation.date = new Date().toISOString();
    // console.log(new Date().toISOString())

    // this.observation.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // this.plants$.subscribe(plants => plants.forEach(plant=>console.log(plant)))
  }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
      webcamImage: ''
    });
  }

  // file upload and compress
  // https://medium.com/swlh/compress-image-and-send-it-to-an-api-in-angular-bc48e6ed3835

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
    /*
    this.sizeOfOriginalImage =
      this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    */
    this.imageCompress
      .compressFile(image, orientation, 90, 100, 800)
      .then((result) => {
        this.imgResultAfterCompress = result;
        this.localCompressedUrl = result;
        this.compressedFiles.push(result);

        /*
        this.sizeOFCompressedImage =
          this.imageCompress.byteCount(result) / (1024 * 1024);
        console.warn(
          'Size in bytes after compression:',
          this.sizeOFCompressedImage
        );
        */

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

  onFileSelect(event: any) {
    //this.compressFile();
    const files = event.target.files;
    console.log('files:', files);
    // this.fileInputLabel = files.name;
    Array.from(files).forEach((file: any, index: number) => {
      if (this.fileUploadForm.get('uploadedImage')) {
        this.fileUploadForm.get('uploadedImage')?.setValue(file);

        console.log('file original:', file);

        /*
        this.imageCompress.compressFile(file, 1, 1, 1, 800, 800)
          .then(
            (compressedImage) => {
              file = compressedImage;
              console.log("compressedImage:", compressedImage);
            });
*/
        console.log('file compressed:', file);

        console.log('this.fileUploadForm:', this.fileUploadForm.value);
        this.uploadArray.push(this.fileUploadForm.get('uploadedImage')?.value);
        this.fileNames[index] = `${Date.now() + index}.jpg`;
        this.observation.photo?.push(this.fileNames[index]);
      }
    });
  }

  // onFormSubmit(): any {

  // }

  save(): any {
    // if (!this.fileUploadForm.get('uploadedImage')?.value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    console.log('filenames', this.fileNames);
    console.log('this.uploadArray', this.uploadArray);

    // handle uploaded files

    this.uploadArray.forEach((file: any, index: number) => {
      if (file) {
        // alert('Please fill valid details!');
        // return false;
        const formData = new FormData();
        // this.pathEvent.emit(this.file);

        formData.append('uploadedImage', file, this.fileNames[index]);
        formData.append('agentId', '007');

        console.log('formData:', formData);
        this.fileNames[index] = `${Date.now() + index}.jpg`;
        this.observation.photo?.push(this.fileNames[index]);
        this.observationService.uploadFile(formData);
      }
    });

    console.log(this.observation);
    console.log("hello");

    this.observationService
      .create(this.observation)
      .subscribe(() => this.router.navigate(['/']));
  }

  async setCurrentUser(): Promise<any> {
    this.currentUser = await lastValueFrom(this.currentUser$);
    this.observation.user._id = this.currentUser._id;
    //console.log(this.currentUser);
  }

  setPlant(plant: Plant): void {
    this.observation.plant._id = plant._id;
    this.setCurrentUser();
    this.selectedPlant = plant;
  }

  setPhase(phase: string): void {
    this.observation.phase = phase;
  }

  setImagePath(fileName: string): void {}

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    const fileName: string = `${this.observation.date}-${this.observation.plant.name}.jpg`;

    // create file from byte
    const imageName = fileName;
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(
      this.webcamImage.imageAsDataUrl.split(',')[1]
    );

    //imageFile created below is the new compressed file which can be send to API in form data
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    console.log("imageFile", imageFile);

    this.fileUploadForm.get('webcamImage')?.setValue(imageFile);
    this.uploadArray.push(this.fileUploadForm.get('webcamImage')?.value);
    console.log("uploadArray:", this.uploadArray)
    //const a = document.createElement('a');
    //a.setAttribute('download', fileName);
    //a.setAttribute('href', webcamImage.imageAsDataUrl);
    //a.click();
    //this.observation.photo?.push(fileName);
  }

  deletePhoto() {
    this.uploadArray.pop();
    this.webcamImage = null;
    //this.cameraComponent.onOffWebCame();
//https://stackoverflow.com/questions/37587732/how-to-call-another-components-function-in-angular2
  }

  // onFileSelected(event: any) {

  //   const file: File = event.target.files[0];

  //   if (file) {

  //     this.fileName = file.name;

  //     const formData = new FormData();

  //     formData.append("thumbnail", file);

  //     const upload$ = this.http.post("/api/thumbnail-upload", formData);
  //     this.observationService.uploadFile(formData);
  //     // this.observationService.uploadFile(formData, this.uploadFileInput);

  //     upload$.subscribe();
  //   }
  // }
}
