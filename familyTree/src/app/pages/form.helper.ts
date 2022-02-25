import { FormControl, Validators } from '@angular/forms';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';

export class FormHelper {
  static getFormData(isRegister: RoutesEnum): Record<string, FormControl> {
    let formBase: Record<string, FormControl> = {
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
    const extendForm: Record<string, FormControl> = {
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
    if (isRegister === RoutesEnum.REGISTRATION) {
      formBase = {
        ...formBase,
        ...extendForm,
      };
    } else if (isRegister === RoutesEnum.EDIT_USER) {
      formBase = {
        ...extendForm,
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
        registrationDate: new FormControl(''),
      }
    }
    return formBase;
  }
}
