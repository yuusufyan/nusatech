import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { PermissionModule } from '../permission/permission.module';
import { RoleCommand } from './commands/role.command';
import { RolePermissionCommand } from './commands/role-permission.command';
import { RoleCRUDApplication } from './applications/role-crud.application';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), PermissionModule],
  providers: [
    RoleService,
    RoleCommand,
    RolePermissionCommand,
    RoleCRUDApplication,
  ],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
