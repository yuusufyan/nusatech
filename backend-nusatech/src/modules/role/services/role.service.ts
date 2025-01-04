import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { IRole } from 'src/interfaces/role.interface';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from '../dto/request.dto';
import { IPermission } from 'src/interfaces/permission.interface';
import { PermissionService } from 'src/modules/permission/services/permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private permissionService: PermissionService,
  ) {}

  async findAll(): Promise<IRole[]> {
    return await this.roleRepository.find();
  }

  async create(body: CreateRoleDTO): Promise<IRole> {
    return await this.roleRepository.save(body);
  }

  async findById(id: string): Promise<IRole> {
    return await this.roleRepository.findOne({
      where: {
        id: id,
      },
      relations: ['permissions'],
    });
  }

  async findByName(name: string): Promise<IRole> {
    return await this.roleRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async findByCode(code: string): Promise<IRole> {
    return await this.roleRepository.findOne({
      where: {
        code: code,
      },
    });
  }

  async syncRolePermissions(
    role: IRole,
    permissions: IPermission[],
  ): Promise<void> {
    role.permissions = permissions;
    await this.roleRepository.save(role);
  }

  async delete(id: string): Promise<IRole> {
    return await this.delete(id);
  }
}
