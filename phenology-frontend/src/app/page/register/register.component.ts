import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/service/auth.service';
//import { User } from 'src/app/model/user';

@Component({ templateUrl: 'register.component.html' })


export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  registrationOK = false;

  //user: User = new User();

  // a POST metódussal a usert _id nélkül kell átadni
  // a form pedig más elemeket is tartalmaz
  // ezért kell ez az új object

  userObject = {
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    password:'',
    accessToken: '',
    confirmationCode: '',
    role: ''
  };


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
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
      termsConditions: [false, Validators.requiredTrue]
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.userObject.firstName = this.form.value.firstName;
    this.userObject.lastName = this.form.value.lastName;
    this.userObject.email = this.form.value.email;
    this.userObject.password = this.form.value.password;
    // active will become true after confirmation email
    this.userObject.active = false;

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
}
