import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, take, tap } from 'rxjs';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public resetForm!: FormGroup;
  public userEmail: string = this.activatedRoute.snapshot.queryParams['email'];
  public emailSendFlag = false;
  get emailControl(): FormControl {
    return this.resetForm.get('email') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
    });
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      this.authenticationService.resetPassword(this.emailControl.value).pipe(
        take(1),
        tap(() => {
          this.toastr.success('Password has been reset ', '');
          this.emailSendFlag = true;
        }),
        catchError((error) => {
          this.toastr.error(`${error.message}`, `Code: ${error.code}`);
          return of(error);
        }),
      ).subscribe();
    }
  }
}
