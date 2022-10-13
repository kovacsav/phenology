import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  forgotPasswordStatus: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  onSendRequest(): void {
    this.authService
      .sendNewPasswordRequest(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.forgotPasswordStatus = 'success';
          //console.log(this.forgotPasswordStatus);
        },
        error: (error) => {
          this.forgotPasswordStatus = 'failed';
          //this.alertService.error(error);
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
