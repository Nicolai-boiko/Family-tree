import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, take } from 'rxjs';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public currentUrl: string = this.activatedRoute.snapshot.url[0].path;
  public authForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUrl !== this.routesEnum.REGISTRATION ?
    this.authForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    }) : 
    this.authForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      secondName: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    })
  }

  signUp(): void {
    if (this.authForm.valid) {
      this.authenticationService.signUp(this.authForm.get('email')?.value, this.authForm.get('password')?.value).pipe(
        take(1),
        finalize(() => this.router.navigate(['/', this.routesEnum.LOG_IN]))
      ).subscribe();
    }
  }

  signIn(): void {
    if (this.authForm.valid) {
      this.authenticationService.signIn(this.authForm.get('email')?.value, this.authForm.get('password')?.value).pipe(
        take(1),
        finalize(() => this.router.navigate(['/', this.routesEnum.TREE]))
      ).subscribe();
    }
  }
}
