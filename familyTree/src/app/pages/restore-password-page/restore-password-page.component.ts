import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  public resetForm!: FormGroup;
  public userEmail: string = this.activatedRoute.snapshot.queryParams['email'];
  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
    });
  }
  submit() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
    }
  }
}
