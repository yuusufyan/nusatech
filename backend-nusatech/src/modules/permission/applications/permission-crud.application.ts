import { ConflictException, Injectable } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { Connection, UpdateResult } from 'typeorm';
import { PermissionDTO } from '../dto/request.dto';
import { IPermission } from 'src/interfaces/permission.interface';

@Injectable()
export class PermissionCRUDApplication {
  constructor(
    private permissionService: PermissionService,
    private connection: Connection,
  ) {}

  async create(body: PermissionDTO): Promise<IPermission> {
    return await this.connection.transaction(async (entityManager) => {
      const existData = await this.permissionService.findByName(body.name);

      if (existData) {
        throw new ConflictException(`Permission already exists`, null);
      }

      return await this.permissionService.create(body);
    });
  }

  async update(id: string, body: PermissionDTO): Promise<UpdateResult> {
    return await this.connection.transaction(async (entityManager) => {
      const exist = await this.permissionService.findById(id);

      if (!exist) throw new ConflictException(`Permission not found`, null);

      return await this.permissionService.update(id, body);
    });
  }
}
