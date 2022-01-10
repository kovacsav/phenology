import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { WebcamImage } from 'ngx-webcam';
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
  // webcamImage: WebcamImage | null = null;
  observations$: Observable<Observation[]> = this.observationService.getAll();

  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef<HTMLInputElement> = {} as ElementRef;
  fileUploadForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  uploadArray: FormGroup[] = [];
  // fileInputLabel: any = '';
  // @Output() pathEvent: EventEmitter<string> = new EventEmitter<string>();
  fileNames: string[] = [];

  // constructor(private datePipe : DatePipe) {
  constructor(
    private observationService: ObservationService,
    private plantService: PlantService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    // this.observation.date = new Date().toISOString().split('T')[0];
    this.observation.date = new Date().toISOString();
    // console.log(new Date().toISOString())


    // this.observation.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // this.plants$.subscribe(plants => plants.forEach(plant=>console.log(plant)))
  }


  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    console.log(files)
    // this.fileInputLabel = files.name;
    Array.from(files).forEach((file: any, index: number) => {
      if (this.fileUploadForm.get('uploadedImage')) {
        this.fileUploadForm.get('uploadedImage')?.setValue(file);
        console.log('this.fileUploadForm', this.fileUploadForm.value)
        this.uploadArray.push(this.fileUploadForm.get('uploadedImage')?.value);
        this.fileNames[index] = `${Date.now() + index}.jpg`;
        this.observation.photo?.push(this.fileNames[index]);
      }

    });
  }


  // onFormSubmit(): any {

  // }

  save(): any {

    this.observationService.create(this.observation).subscribe(
      () => this.router.navigate(['/']));

    // if (!this.fileUploadForm.get('uploadedImage')?.value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }
    console.log('filenames', this.fileNames)
    console.log('this.uploadArray', this.uploadArray)
    this.uploadArray.forEach((file: any, index: number) => {
      if (file) {
        // alert('Please fill valid details!');
        // return false;
        const formData = new FormData();
        // this.pathEvent.emit(this.file);
        formData.append('uploadedImage', file, this.fileNames[index]);
        formData.append('agentId', '007');
        this.observationService.uploadFile(formData);
      }
    })
  }

  setPlant(plant: Plant): void {
    this.observation.plant = plant;
  }

  setPhase(phase: string): void {
    this.observation.phase = phase;
  }

  setImagePath(fileName: string): void {
  }

  // handleImage(webcamImage: WebcamImage) {
  //   this.webcamImage = webcamImage;
  //   const fileName: string = `${this.observation.date}-${this.observation.plant.name}.png`
  //   const a = document.createElement('a');
  //   a.setAttribute('download', fileName);
  //   a.setAttribute('href', webcamImage.imageAsDataUrl);
  //   a.click();
  //   this.observation.photo = fileName;
  // }

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
