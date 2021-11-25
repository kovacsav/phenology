import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  //   public files: NgxFileDropEntry[] = [];

  // constructor(
  //   public http: HttpClient
  // ) { }

  // ngOnInit(): void {
  // }

  // public async dropped(files: NgxFileDropEntry[]) {
  //   this.files = files;
  //   for (const droppedFile of files) {

  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       // const fileEntry = droppedFile.fileEntry;
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       // const formData = new FormData();
  //       // await new Promise<void>((resolve, reject) => {
  //       //   fileEntry.file((file: File) => {
  //       //     formData.append('input_files', file, droppedFile.relativePath);
  //       //     resolve();
  //       //   });
  //       // });

  //       fileEntry.file((file: File) => {

  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);


  //         // You could upload it like this:
  //         const formData = new FormData()
  //         // formData.append('logo', file, relativePath)
  //         formData.append('logo', file)

  //         // Headers
  //         const headers: HttpHeaders = new HttpHeaders({
  //           'security-token': 'c1375462-2b87-4940-baf5-65d5ef275fce'
  //         })
  //         // this.http.post('gs://phenology-af2ec.appspot.com/', formData, { headers: headers, responseType: 'blob' })
  //         this.http.post('gs://phenology-af2ec.appspot.com', formData, { headers: headers, responseType: 'blob' })
  //         .subscribe(data => {
  //           // Sanitized logo returned from backend
  //         })


  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       // const fileEntry = droppedFile.fileEntry;
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  // public fileOver(event: Event){
  //   console.log(event);
  // }

  // public fileLeave(event: Event){
  //   console.log(event);
  // }


  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef<HTMLInputElement> = {} as ElementRef;
  fileUploadForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  fileInputLabel: any = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    // if (this.fileUploadForm.get('uploadedImage')) {
      this.fileUploadForm.get('uploadedImage')?.setValue(file);

    // }
  }


  onFormSubmit(): any {

    if (!this.fileUploadForm.get('uploadedImage')?.value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage')?.value);
    formData.append('agentId', '007');


    this.http
      .post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }


}
