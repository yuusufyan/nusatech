import { IUser } from 'src/interfaces/user.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { IRole } from 'src/interfaces/role.interface';

@Entity('mst_users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'slug', nullable: true })
  slug: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  // @Column({ name: 'refresh_token', nullable: true })
  // refreshToken: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'created_at', nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false, default: new Date() })
  updatedAt: Date;

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  role: string | IRole;
}
