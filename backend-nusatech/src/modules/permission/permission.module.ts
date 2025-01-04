import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { PermissionCommand } from './commands/permission.command';
import { PermissionCRUDApplication } from './applications/permission-crud.application';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionCommand, PermissionCRUDApplication],
  exports: [PermissionService],
})
export class PermissionModule {}
