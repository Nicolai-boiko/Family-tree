import { FormControl, Validators } from '@angular/forms';

export class LoginPageHelper {
  static getFormData(isRegister: boolean): Record<string, FormControl> {
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
    if (isRegister) {
      formBase = {
        ...formBase,
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
    }
    return formBase;
  }
}
