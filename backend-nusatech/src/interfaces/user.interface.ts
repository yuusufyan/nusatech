import { IRole } from './role.interface';

export interface IUser {
  id: string;
  email: string;
  username: string;
  slug: string;
  password: string;
  // refreshToken: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  role: string | IRole;
}
