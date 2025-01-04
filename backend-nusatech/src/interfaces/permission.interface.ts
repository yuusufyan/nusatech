import { IRole } from './role.interface';

export interface IPermission {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  roles: IRole[];
}
