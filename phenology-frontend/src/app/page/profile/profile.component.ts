import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  registrationOK = false;
  signedin: boolean = false;
  user: User = new User();

// a POST metódussal a usert _id nélkül kell átadni
// ezért kell ez az új object

  userObject = {
    email: '',
    firstName: '',
    lastName: '',
    password:''
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required]
    })

    // set user
    //this.user.firstName = this.cookieService.get('currentUserFirstName');
    //this.user.lastName = this.cookieService.get('currentUserLastName');
    //this.user.password = this.cookieService.get('password');

    this.authService.currentUserSubject$.subscribe({
      next: (user) => {
        this.user.firstName = user?.firstName;
        this.user.lastName = user?.lastName;
        this.user.password = user?.password || '';
        this.user.email = user?.email;
      },
      error: () => {
        this.user.firstName = ''
      },
    });

    this.signedin = this.user.firstName? true : false;
/*
  // authorization
    this.authService.currentUserSubject$.subscribe({
      next: (user) => {
        this.signedin = user?.firstName ? true : false;
      },
      error: () => {
        this.signedin = false;
      },
    });
    */
  };


  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.userObject.firstName = this.form.value.firstName;
    this.userObject.lastName = this.form.value.lastName;
    this.userObject.password = this.form.value.password;
    this.userObject.email = this.user.email || '';

    //console.log(this.user);

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword){
      return
    }

    this.loading = true;
    this.authService
      .register(this.userObject)
      .pipe(first())
      .subscribe({
        next: () => {
          this.registrationOK = true;
          //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          //alert("Sikeres regisztráció!");
          //this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error: (error) => {
          //this.alertService.error(error);
          alert("Sikertelen regisztráció! Ezzel az email címmel már regisztráltak. Amennyiben az email cím az Öné, kérhet új jelszót.");
          alert(JSON.stringify(error));
          this.loading = false;
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }

  onDelete(): void {
    this.router.navigate(['/']);
  }
}
