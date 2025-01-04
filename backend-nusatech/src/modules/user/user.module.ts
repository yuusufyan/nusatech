import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserCrudApplication } from './applications/user-crud.application';
import { JwtStrategy } from './jwt.strategy';
import { RoleModule } from '../role/role.module';
import { TokenModule } from '../token/token.module';
import { config } from 'src/common/configs/index.config';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: config.jwt.tokenSecret,
      signOptions: { expiresIn: config.jwt.tokenExpire },
    }),
    RoleModule,
    TokenModule,
    MailModule,
  ],
  providers: [UserService, UserCrudApplication, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
