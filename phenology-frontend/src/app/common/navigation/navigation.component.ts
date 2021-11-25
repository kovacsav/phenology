import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user$: BehaviorSubject<User | null> = this.auth.currentUserSubject$;
  user: string = localStorage.getItem('currentUser') || '';
  currentUser$: Observable<User> = this.userService.getAll().pipe(
    switchMap(users => users.filter(user => user.email === JSON.parse(this.user).email))
  );

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout();
  }

}
