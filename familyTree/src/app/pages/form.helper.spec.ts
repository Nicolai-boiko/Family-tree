import { FormControl } from '@angular/forms';
import { FormHelper } from './form.helper';
import { RoutesEnum } from '../constants/Enums/common.enums';

describe('FormHelper', () => {
  describe('getFormData', () => {
    it('should return correct data for RoutesEnum.REGISTRATION', () => {
      const result: Record<string, FormControl> = FormHelper.getFormData(RoutesEnum.REGISTRATION);

      expect(Object.keys(result)).toEqual([
        'email',
        'password',
        'firstName',
        'secondName',
        'gender'
      ]);
    });

    it('should return correct data for RoutesEnum.EDIT_USER', () => {
      const result: Record<string, FormControl> = FormHelper.getFormData(RoutesEnum.EDIT_USER);

      expect(Object.keys(result)).toEqual([
        'firstName',
        'secondName',
        'gender',
        'birthday',
        'country',
        'city',
        'postcode',
        'telephone',
        'registrationDate',
        'photoUrl',
      ]);
    });

    it('should return correct data for RoutesEnum.LOG_IN', () => {
      const result: Record<string, FormControl> = FormHelper.getFormData(RoutesEnum.LOG_IN);

      expect(Object.keys(result)).toEqual(['email', 'password']);
    });
  });
});
