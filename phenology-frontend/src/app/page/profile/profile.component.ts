import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Output() currentUser: EventEmitter<User> = new EventEmitter<User>();

  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  submitted: boolean = false;
  profileUpdateOK: boolean = false;
  profileUpdateError: boolean = false;
  signedin: boolean = false;
  user: User = new User();
  confirmPassword: string = '';

  // a POST metódussal a usert _id nélkül kell átadni
  // ezért kell ez az új object

  userObject = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private toastrService: ToastrService
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
      confirmPassword: ['', Validators.required],
    });

    // set user

    this.authService.currentUserSubject$.subscribe({
      next: (user) => {
        this.user.firstName = user?.firstName;
        this.user.lastName = user?.lastName;
        this.user.password = this.cookieService.get('password').slice(1, -1);
        this.confirmPassword = this.user.password;
        //this.user.password = user?.password || '';
        this.user.email = user?.email;
        //console.log("user", user);
      },
      error: () => {
        this.user.firstName = '';
      },
    });

    this.signedin = this.user.firstName ? true : false;

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.currentUser.emit(this.user);
    this.submitted = true;

    this.userObject.firstName = this.form.value.firstName;
    this.userObject.lastName = this.form.value.lastName;
    this.userObject.password = this.form.value.password;
    this.userObject.email = this.user.email || '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      return;
    }

    this.loading = true;
    this.authService
      .profileUpdate(this.userObject)
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (user) {
            this.profileUpdateOK = true;
            this.cookieService.set(
              'currentUserFirstName',
              JSON.stringify(this.userObject.firstName)
            );
            this.cookieService.set(
              'currentUserLastName',
              JSON.stringify(this.userObject.lastName)
            );
            this.cookieService.set(
              'password',
              JSON.stringify(this.userObject.password)
            );
            //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            //alert("Sikeres regisztráció!");
            //this.router.navigate(['/login'], { relativeTo: this.route });
          }
        },
        error: (error) => {
          //this.alertService.error(error);
          this.profileUpdateError= true;
          alert(
            'Sikertelen regisztráció! Ezzel az email címmel már regisztráltak. Amennyiben az email cím az Öné, kérhet új jelszót.'
          );
          alert(JSON.stringify(error));
          this.loading = false;
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onDelete(): void {
    this.currentUser.emit(this.user);
    this.submitted = true;

    this.userObject.firstName = this.form.value.firstName;
    this.userObject.lastName = this.form.value.lastName;
    this.userObject.password = this.form.value.password;
    this.userObject.email = this.user.email || '';

    //console.log(this.user);

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      return;
    }

    this.loading = true;
    this.authService
      .profileDelete(this.userObject)
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (user) {
            //alert("A profil törlése sikeres.");
            this.toastrService.success('Rendben', 'A profil törlése sikeres.', {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
              progressBar: true
            });
          }
        },
        error: (error) => {
          //this.alertService.error(error);
          //alert('A profil törlése sikertelen.');
          //alert(JSON.stringify(error));
          this.toastrService.error('Hiba történt', 'A profil törlése sikertelen.', {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            progressBar: true
          });
          this.loading = false;
        },
      });
    this.router.navigate(['/']);
  }
}
