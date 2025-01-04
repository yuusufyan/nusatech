import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../services/role.service';
import { Command } from 'nestjs-command';
import RoleSeed from '../seeder/role.seeder';

@Injectable()
export class RoleCommand {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private roleService: RoleService,
  ) {}

  @Command({
    command: 'seed:role',
    describe: 'create all records for role',
  })
  async create() {
    const roles = await this.roleService.findAll();

    if (roles.length > 0) {
      await Promise.all(
        RoleSeed.map(async (body) => {
          const ifExists = roles.some((role) => role.name === body.name);

          if (!ifExists) {
            await this.roleService.create(body);
          }
        }),
      );
    } else {
      await Promise.all(
        RoleSeed.map(async (body) => await this.roleService.create(body)),
      );
    }
  }
}
