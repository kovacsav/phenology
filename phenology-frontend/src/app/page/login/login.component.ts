import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    console.log(this.user)
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/observation']);
        }
      }
    );
  }

  // setPassword(): void {
  //   this.userService.update({_id: 'uuuuuuuuuu', password: 'user_pw'})
  //     .subscribe( response => console.log(response) );
  // }

}
