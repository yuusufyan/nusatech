import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'username' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', title: 'slug' })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'role' })
  role: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ type: 'string', title: 'email' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'username' })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'slug' })
  slug: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'password' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'role' })
  role: string;
}

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'password' })
  password: string;
}

export class GetUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  id: string;
}
