import { HttpException, Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from './modules/token/token.module';
import { MailModule } from './modules/mail/mail.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ProductModule } from './modules/product/product.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    RoleModule,
    PermissionModule,
    UserModule,
    CommandModule,
    TokenModule,
    MailModule,
    ProductModule,
    ChatModule,
  ],
  controllers: [],
  providers: [
    {
      // Validation formatting response
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
