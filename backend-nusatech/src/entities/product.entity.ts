import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('mst_products')
export class ProductEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false})
  name: string;

  @Column({ name: 'price', nullable: false})
  price: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  @Column({ name: 'created_at', nullable: false, default: new Date() })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at', nullable: false, default: new Date() })
  updatedAt: Date;
  
  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'created_by', default: null})
  createdBy: string
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  created_by: UserEntity;

  @Column({ name: 'updated_by', default: null})
  updatedBy: string
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
  updated_by: UserEntity;

  @Column({ name: 'deleted_by', default: null})
  deletedBy: string
  @ManyToOne(() => UserEntity) // Nullable karena tidak selalu ada
  @JoinColumn({ name: 'deleted_by', referencedColumnName: 'id' })
  deleted_by: UserEntity;
}