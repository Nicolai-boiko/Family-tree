import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  public token: string = this.activatedRoute.snapshot.url[0].path;
  public flag: boolean = this.token === 'registration' ? true : false;
  public loginForm!: FormGroup;
  public hide: boolean = true;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
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
    });
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
