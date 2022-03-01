import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  lastToken: string = '';
  loginUrl: string = `${this.config.apiUrl}login`;
  registerUrl: string = `${this.config.apiUrl}register`;
  user: User = new User;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.currentUser) {
      const user: User = JSON.parse(localStorage.currentUser);
      this.lastToken = user.accessToken || '';
      this.currentUserSubject$.next(user);
    }
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ user: User, accessToken: string }>(
      this.loginUrl, loginData
    ).pipe(
      map(response => {
        response.user = loginData
        console.log('authservice',loginData)
        if (response.user && response.accessToken) {
          this.lastToken = response.accessToken;
          response.user.accessToken = response.accessToken;
          this.currentUserSubject$.next(response.user);
          localStorage.currentUser = JSON.stringify(response.user);
          return response.user;
        }
        return null;
      })
    )
  }

  logout(): void {
    this.lastToken = '';
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}${this.registerUrl}`, user);
  }

}
