import { FormControl, Validators } from '@angular/forms';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';

export class FormHelper {
  static getFormData(isRegister: RoutesEnum): Record<string, FormControl> {
    const email: FormControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]);
    const password: FormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    const firstName: FormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z]/g),
      Validators.maxLength(50),
    ]);
    const secondName: FormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z]/g),
      Validators.maxLength(50),
    ]);
    const gender: FormControl = new FormControl('', [Validators.required]);
    const birthday: FormControl = new FormControl('');
    const country: FormControl = new FormControl('', [
      Validators.pattern(/[a-zA-Z]/g),
      Validators.maxLength(50),
    ]);
    const city: FormControl = new FormControl('', [
      Validators.pattern(/[a-zA-Z]/g),
      Validators.maxLength(50),
    ]);
    const postcode: FormControl = new FormControl('', [
      Validators.pattern(/\d/g),
      Validators.maxLength(8),
    ]);
    const telephone: FormControl = new FormControl('', [
      Validators.pattern(/^[+][0-9]*/g),
      Validators.maxLength(8),
    ]);
    const registrationDate: FormControl = new FormControl('');
    const photoUrl: FormControl = new FormControl('');

    switch (isRegister) {
      case RoutesEnum.REGISTRATION:
        return {
          email,
          password,
          firstName,
          secondName,
          gender,
        };
      case RoutesEnum.EDIT_USER:
        return {
          firstName,
          secondName,
          gender,
          birthday,
          country,
          city,
          postcode,
          telephone,
          registrationDate,
          photoUrl,
        };
      default:
        return {
          email,
          password,
        };
    }
  }
}
