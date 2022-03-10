import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  lastToken: string = '';
  loginUrl: string = `${this.config.apiUrl}login`;
  registerUrl: string = `${this.config.apiUrl}register`;
  confirmUrl: string = `${this.config.apiUrl}confirm`;
  newPasswordUrl: string = `${this.config.apiUrl}newpassword`;
  setNewPassword: string = `${this.config.apiUrl}setnewpassword`;


  //user: User = new User;
  userObject: Object = new Object();
  confirmationIsOk = false;

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
    return this.http
      .post<{ user: User; accessToken: string }>(this.loginUrl, loginData)
      .pipe(
        map((response) => {
          response.user = loginData;
          console.log('authservice', loginData);
          if (response.user && response.accessToken) {
            this.lastToken = response.accessToken;
            response.user.accessToken = response.accessToken;
            this.currentUserSubject$.next(response.user);
            localStorage.currentUser = JSON.stringify(response.user);
            return response.user;
          }
          return null;
        })
      );
  }

  logout(): void {
    this.lastToken = '';
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);
  }

  register(userObject: Object): Observable<Object> {
    console.log('küldöm a kérést:', `${this.registerUrl}`, userObject);
    return this.http.post<User>(`${this.registerUrl}`, userObject);
  }

  verifyUser(code: string): Observable<Object> {
    return this.http.get(this.confirmUrl + '/'+ code);
  }

  sendNewPasswordRequest(email: string): Observable<Object> {
    console.log('küldöm a kérést:', `${this.newPasswordUrl}`, email);
    return this.http.get(this.newPasswordUrl + '/'+ email);
  }

  sendNewPassword(object: Object): Observable<Object> {
    console.log('küldöm a kérést:', `${this.setNewPassword}`, object);
    return this.http.post<object>(`${this.setNewPassword}`, object);
  }
}
