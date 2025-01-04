import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
