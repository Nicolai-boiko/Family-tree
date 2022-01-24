import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public resetForm!: FormGroup;
  public userEmail: string = this.activatedRoute.snapshot.queryParams['email'];
  public emailSendFlag: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthService
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

  ressetPassword(): void {
    if (this.resetForm.valid) {
      this.authenticationService.ressetPassword(
        this.resetForm.get('email')?.value
      ).then(res => this.emailSendFlag = true);
    }
  }
}
