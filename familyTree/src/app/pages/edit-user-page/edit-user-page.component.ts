import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  public profileForm!: FormGroup;
  public gender: typeof GenderEnum = GenderEnum;

  get firstNameControl(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }
  get secondNameControl(): FormControl {
    return this.profileForm.get('secondName') as FormControl;
  }
  get countryControl(): FormControl {
    return this.profileForm.get('country') as FormControl;
  }
  get cityControl(): FormControl {
    return this.profileForm.get('city') as FormControl;
  }
  get postcodeControl(): FormControl {
    return this.profileForm.get('postcode') as FormControl;
  }
  constructor() { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
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
      gender: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern(/\d/g),
        Validators.maxLength(8),
      ]),
    })
  }

  onSubmit(): void {

  }
}
