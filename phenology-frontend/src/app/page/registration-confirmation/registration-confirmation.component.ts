import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
} from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.scss'],
})
export class RegistrationConfirmationComponent implements OnInit {
  confirmationCode: string = '';
  confirmationStatus: string = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //console.log('confirmation starts');
    this.confirmationCode =
      this.activatedRoute.snapshot.params.confirmationCode;
    //this.activatedRoute.queryParams.subscribe(
    //  (params) => (this.confirmationCode = params.get('confirmationCode'))
    //);
    //this.activatedRoute.queryParams.subscribe(params => this.confirmationCode = params.get('confirmationCode'));
    //console.log(this.confirmationCode);
    this.authService
      .verifyUser(this.confirmationCode)
      .pipe(first())
      .subscribe({
        next: () => {
          this.confirmationStatus = 'success';
          //console.log(this.confirmationStatus);
        },
        error: (error) => {
          this.confirmationStatus = 'failed';
          //this.alertService.error(error);
          alert('Sikertelen regisztráció!');
          alert(JSON.stringify(error));
          //this.router.navigate(['/', 'register']);
        },
      });
  }
}
