import { GenderEnum } from '../constants/Enums/common.enums';

export interface IUser {
  email: string;
  password: string | null;
  firstName?: string;
  secondName?: string;
  thirdName?: string | null;
  gender?: GenderEnum;
  birth?: Date | null;
  death?: Date | null;
  id?: string | null;
  photoUrl?: string;
}
