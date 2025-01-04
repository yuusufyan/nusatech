import { ConflictException, Injectable } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { RoleRequestDTO } from '../dto/request.dto';
import { IPermission } from 'src/interfaces/permission.interface';
import { PermissionService } from 'src/modules/permission/services/permission.service';
import { Connection } from 'typeorm';
import {
  AssignPermissionDTO,
  PermissionDTO,
} from 'src/modules/permission/dto/request.dto';

@Injectable()
export class RoleCRUDApplication {
  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private connection: Connection,
  ) {}
  async createRole(body: RoleRequestDTO): Promise<any> {
    return await this.connection.transaction(async (entityManager) => {
      const existName = await this.roleService.findByName(body.name);

      if (existName) {
        throw new ConflictException(`Role Name already exists`, null);
      }

      const existCode = await this.roleService.findByCode(body.code);

      if (existCode) {
        throw new ConflictException(`Role Code already exists`, null);
      }

      let permissions: IPermission[] = [];

      if (body.permissions && body.permissions.length > 0) {
        for (const permission of body.permissions) {
          const exist: IPermission = await this.permissionService.findById(
            permission as string,
          );

          if (exist) {
            permissions.push(exist);
          }
        }
      }

      const createdRole = await this.roleService.create(body);

      if (permissions.length > 0) {
        await this.roleService.syncRolePermissions(createdRole, permissions);
      }

      return createdRole;
    });
  }

  async updateRole(id: string, body: RoleRequestDTO) {
    return await this.connection.transaction(async (entityManager) => {
      const exist = await this.roleService.findById(id);

      if (!exist) {
        throw new ConflictException(`Role does not exist`, null);
      }

      let permissions: IPermission[] = [];

      if (body.permissions && body.permissions.length > 0) {
        for (const permission of body.permissions) {
          const exist: IPermission = await this.permissionService.findById(
            permission as string,
          );

          if (exist) {
            permissions.push(exist);
          }
        }
      }

      const updateResult = await this.roleService.create({
        ...exist,
        ...body,
      });

      if (permissions.length > 0) {
        await this.roleService.syncRolePermissions(updateResult, permissions);
      }

      return updateResult;
    });
  }

  async assignPermission(id: string, body: AssignPermissionDTO) {
    return await this.connection.transaction(async (entityManager) => {
      const existRole = await this.roleService.findById(id);

      if (!existRole) {
        throw new ConflictException(`Role doesn not exist`, null);
      }

      let permissions: IPermission[] = existRole.permissions;

      if (body.permissions && body.permissions.length > 0) {
        for (const permission of body.permissions) {
          const exist: IPermission = await this.permissionService.findById(
            permission as string,
          );

          if (exist) {
            permissions.push(exist);
          }
        }
      }

      if (permissions.length > 0) {
        await this.roleService.syncRolePermissions(existRole, permissions);
      }

      return permissions;
    });
  }
}
