import { GenderEnum } from '../Enums/common.enums';
export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  secondName?: string;
  gender?: GenderEnum;
  registrationDate?: string;
  uid?: string;
  country?: string;
  city?: string;
  postcode?: string;
  birthday?: string;
}
