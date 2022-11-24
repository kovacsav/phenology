import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  isLoginOk: boolean = true;
  isEmailRegistrated: boolean = true;

  @Output() currentUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.currentUser.emit(this.user);
    //console.log(this.user)
    this.auth.login(this.user).pipe(first()).subscribe({
      next: (user) => {
        if (user) {
          this.isLoginOk = true;
          this.isEmailRegistrated = true;
          this.router.navigate(['/observation']);
        }
      },
      error: (error) => {
        // http error response:
        // "message":"Http failure response for http://localhost:3000/login: 401 Unauthorized",
        //"error":{"msg":"Ezzel az email címmel nincs regisztrált felhasználó."}}
        this.isLoginOk = false;
        this.isEmailRegistrated = !JSON.stringify(error).includes("Ezzel az email");
        //alert("Sikertelen bejelentkezés.");
        //alert(JSON.stringify(error));
        //console.log(JSON.stringify(error).includes("Ezzel az email"));
      },
    });
  }

}
