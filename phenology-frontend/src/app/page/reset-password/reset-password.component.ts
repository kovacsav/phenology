import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
} from '@angular/router';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  resetPasswordStatus: string = '';
  userID: string = '';
  token: string = '';
  newPassword: string = '';
  serverResponse: string = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    //private customValidator: CustomValidatorService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
    //{validator: this.checkPassword('password', 'confirmPassword') }
    //CustomValidatorService.mustMatch('password', 'confirmPassword')
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    //console.log('password reset starts');
    this.submitted = true;
    this.token = this.activatedRoute.snapshot.params.token;
    this.userID = this.activatedRoute.snapshot.params.id;
    //console.log(this.token, this.userID);
    this.newPassword = this.form.value.password;

    //console.log(this.form.invalid);

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword){
      return
    }

    this.loading = true;

    this.authService
      .sendNewPassword({
        token: this.token,
        userID: this.userID,
        newPassword: this.newPassword,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.resetPasswordStatus = 'success';
          //console.log(this.resetPasswordStatus);
        },
        error: (error) => {
          this.resetPasswordStatus = 'failed';
          //this.alertService.error(error);
          this.serverResponse = JSON.stringify(error);
          //alert('Sikertelen regisztráció!');
          //alert(JSON.stringify(error));
          //this.router.navigate(['/', 'register']);
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }

}
