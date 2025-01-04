import { TokenType } from 'src/common/enums/index.enum';
import { IUser } from './user.interface';

export interface IToken {
  id: string;
  token: string;
  purpose: TokenType;
  isActive: boolean;
  expiredIn: Date;
  createdAt: Date;

  user: IUser;
}
