import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observation } from '../model/observation';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService extends BaseService<Observation>  {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'observations';
  }

  uploadFile(formData: FormData): string {
    this.http
      .post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          // uploadFileInput.nativeElement.value = "";
        }
        return response.uploadedFile.path
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
    return '';
  }

}
