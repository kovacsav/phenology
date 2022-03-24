import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  userFirstName?: string | null = '';
  userLastName?: string = '';
  user: User = new User();
  userNavbar$?: Subscription;

  //user$: BehaviorSubject<User | null> = this.auth.currentUserSubject$;
  //user: string = localStorage.getItem('currentUser') || '';
  //currentUser$: Observable<User> = this.userService.getAll().pipe(
  //  switchMap(users => users.filter(user => user.email === JSON.parse(this.user).email))
  //);
/*
  userNavbar$ =
    this.auth.currentUserSubject$.subscribe({
      next: () => {
        this.userFirstName = this.cookieService.get("FirstName");
        this.userLastName = this.cookieService.get("LastName");
      },
      error: () => {
        this.userFirstName = '',
        this.userLastName = '';
      },
    });

*/
  //userFirstName$: Observable<User> = this.cookieService.get("FirstName");
  //userLastName$: BehaviorSubject<User | null> = this.cookieService.get("LastName");

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.userNavbar$ =
    this.auth.currentUserSubject$.subscribe({
      next: (user) => {
        this.userFirstName = user?.firstName;
        //this.userFirstName = this.cookieService.get("FirstName");
        console.log('user first name:', this.userFirstName);
        this.userLastName = user?.lastName;
        //this.userLastName = this.cookieService.get("LastName");
      },
      error: () => {
        this.userFirstName = '',
        this.userLastName = '';
      },
    });
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
