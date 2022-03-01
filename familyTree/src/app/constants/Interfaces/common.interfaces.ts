import { GenderEnum } from '../Enums/common.enums';
export interface IUser {
  email?: string;
  password?: string | null;
  firstName?: string;
  secondName?: string;
  thirdName?: string | null;
  gender?: GenderEnum;
  id?: string | null;
  photoUrl?: string;
  registrationDate?: string;
  uid?: string;
  country?: string;
  city?: string;
  postcode?: string;
  birthday?: string;
}

export interface FirebaseError {
  code: string;
  message?: string;
  name?: string;
  stack?: string;
}
