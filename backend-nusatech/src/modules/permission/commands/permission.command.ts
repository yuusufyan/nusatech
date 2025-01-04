import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { PermissionService } from '../services/permission.service';
import { Command } from 'nestjs-command';
import PermissionSeed from '../seeder/permission.seeder';

@Injectable()
export class PermissionCommand {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
    private permissionService: PermissionService,
  ) {}

  @Command({
    command: 'seed:permission',
    describe: 'create all records for permissions',
  })
  async create() {
    const permissions = await this.permissionService.findAll();

    if (permissions.length > 0) {
      await Promise.all(
        PermissionSeed.map(async (body) => {
          const ifExists = permissions.some(
            (permission) => permission.name === body.name,
          );

          if (!ifExists) {
            await this.permissionService.create(body);
          }
        }),
      );
    } else {
      await Promise.all(
        PermissionSeed.map(
          async (body) => await this.permissionService.create(body),
        ),
      );
    }
  }
}
