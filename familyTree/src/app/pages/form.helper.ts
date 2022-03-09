import { FormControl, Validators } from '@angular/forms';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';

export class FormHelper {
  static getFormData(isRegister: RoutesEnum): Record<string, FormControl> {
    const loginForm: Record<string, FormControl> = {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    };

    const registerForm: Record<string, FormControl> = {
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
    };

    const profileForm: Record<string, FormControl> = {
      birthday: new FormControl(''),
      country: new FormControl('', [
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      city: new FormControl('', [
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      postcode: new FormControl('', [
        Validators.pattern(/\d/g),
        Validators.maxLength(8),
      ]),
      telephone: new FormControl('', [
        Validators.pattern(/^[+][0-9]*/g),
        Validators.maxLength(8),
      ]),
      registrationDate: new FormControl(''),
      photoUrl: new FormControl(''),
    };

    switch (isRegister) {
      case RoutesEnum.REGISTRATION:
        return {
          ...loginForm,
          ...registerForm,
        };
      case RoutesEnum.EDIT_USER:
        return {
          ...registerForm,
          ...profileForm,
        };
      default:
        return loginForm;
    }
  }
}
