import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivationDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', title: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'url' })
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'token' })
  token: string;
}
