import { TokenType } from 'src/common/enums/index.enum';
import { IToken } from 'src/interfaces/token.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from 'src/interfaces/user.interface';

@Entity('tokens')
export class TokenEntity implements IToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'token', nullable: false })
  token: string;

  @Column({
    name: 'purpose',
    type: 'enum',
    enum: TokenType,
    default: TokenType.AUTH,
  })
  purpose: TokenType;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'expired_in', nullable: true })
  expiredIn: Date;

  @Column({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: IUser;
}
