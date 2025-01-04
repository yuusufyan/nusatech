import { config } from '../configs/index.config';

export enum TokenType {
  OTP = 'OTP',
  AUTH = 'AUTH',
}

export enum url {
  DEV = `http://localhost:3001`,
}

export class JwtUser {
  id: string;
  username: string;
}