import { Injectable } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { PermissionService } from 'src/modules/permission/services/permission.service';
import { Command } from 'nestjs-command';
import { IPermission } from 'src/interfaces/permission.interface';
import { IRole } from 'src/interfaces/role.interface';

@Injectable()
export class RolePermissionCommand {
  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
  ) {}

  @Command({
    command: 'seed:role-permission',
    describe: 'create all records for role permissions',
  })
  async create() {
    const roles = await this.roleService.findAll();

    await Promise.all(
      roles.map(async (role) => {
        const permissions = await this.permissionService.findAll();
        await this.createPermissions(permissions, role);
      }),
    );
  }

  async createPermissions(
    permissions: IPermission[],
    role: IRole,
  ): Promise<void> {
    await Promise.all(
      permissions.map(async (permission: { id: string }) =>
        this.permissionService.addRolePermission(role.id, permission.id),
      ),
    );
  }
}
