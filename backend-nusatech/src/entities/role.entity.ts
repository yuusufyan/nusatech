import { IRole } from 'src/interfaces/role.interface';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { IPermission } from 'src/interfaces/permission.interface';

@Entity('mst_roles')
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'is_active', nullable: false, default: false })
  isActive: boolean;

  @Column({
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => PermissionEntity, { cascade: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission', referencedColumnName: 'id' },
  })
  permissions: IPermission[];
}
