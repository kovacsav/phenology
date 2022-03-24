import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { NgxFileDropModule } from 'ngx-file-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { CookieService } from 'ngx-cookie-service';

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
import { FooterComponent } from './common/footer/footer.component';
import { ArticleComponent } from './page/article/article.component';
import { HistoryComponent } from './page/history/history.component';
import { GuideComponent } from './page/guide/guide.component';
import { ObservedDatasComponent } from './page/observed-datas/observed-datas.component';
import { DetailedPlantGuideComponent } from './page/guide/detailed-plant-guide/detailed-plant-guide.component';
import { IndividualPlantGuideComponent } from './page/guide/individual-plant-guide/individual-plant-guide.component';
import { FullArticleComponent } from './page/full-article/full-article.component';
import { ChallengeComponent } from './page/challenge/challenge.component';
import { RegisterComponent } from './page/register/register.component';
import { RegistrationConfirmationComponent } from './page/registration-confirmation/registration-confirmation.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { ProfileComponent } from './page/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservationDatasComponent,
    HomeComponent,
    CameraComponent,
    UploadImageComponent,
    LoginComponent,
    NavigationComponent,
    MapComponent,
    FooterComponent,
    ArticleComponent,
    HistoryComponent,
    GuideComponent,
    ObservedDatasComponent,
    DetailedPlantGuideComponent,
    IndividualPlantGuideComponent,
    FullArticleComponent,
    ChallengeComponent,
    RegisterComponent,
    RegistrationConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg8fF_7JOUEWLbbHKpZ1_vjsiQTTk6e5Q',
    }),
    MapsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
