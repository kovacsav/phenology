import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { WebcamModule } from 'ngx-webcam';
import { NgxFileDropModule } from 'ngx-file-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservationDatasComponent } from './page/observation-datas/observation-datas.component';
import { HomeComponent } from './page/home/home.component';
import { CameraComponent } from './common/camera/camera.component';
import { UploadImageComponent } from './page/upload-image/upload-image.component';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { NavigationComponent } from './common/navigation/navigation.component';
import { MapComponent } from './common/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    ObservationDatasComponent,
    HomeComponent,
    CameraComponent,
    UploadImageComponent,
    LoginComponent,
    NavigationComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // WebcamModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg8fF_7JOUEWLbbHKpZ1_vjsiQTTk6e5Q'
    }),
    MapsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
