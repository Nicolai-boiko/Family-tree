import { GenderEnum } from '../Enums/common.enums';
export interface User {
  email: string;
  password: string;
  firstName?: string;
  secondName?: string;
  gender?: GenderEnum;
}
