import { IPermission } from './permission.interface';

export interface IRole {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  permissions: IPermission[];
}
