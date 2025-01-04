import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { IPermission } from 'src/interfaces/permission.interface';
import { ILike, Repository } from 'typeorm';
import { PermissionDTO } from '../dto/request.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}
  async findAll(): Promise<IPermission[]> {
    return await this.permissionRepository.find();
  }

  async create(body: PermissionDTO) {
    return await this.permissionRepository.save(body);
  }

  async findByName(name: string) {
    return await this.permissionRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async findById(id: string) {
    return await this.permissionRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, body: Partial<PermissionDTO>) {
    return await this.permissionRepository.update(id, {
      ...body,
      updatedAt: new Date(),
    });
  }
  async addRolePermission(role: string, permission: string): Promise<void> {
    await this.permissionRepository.query(
      `INSERT INTO role_permissions (role, permission) VALUES ('${role}', '${permission}')`,
    );
  }
}
