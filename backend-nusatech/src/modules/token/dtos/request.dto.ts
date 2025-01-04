import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { TokenType } from 'src/common/enums/index.enum';
import { IUser } from 'src/interfaces/user.interface';

export class CreateTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum(TokenType)
  @IsNotEmpty()
  purpose: TokenType;

  @IsDate()
  @IsNotEmpty()
  expiredIn: Date;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  user: IUser;
}

export class UpdateTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum(TokenType)
  @IsNotEmpty()
  purpose: TokenType;

  @IsDate()
  @IsNotEmpty()
  expiredIn: Date;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  user: IUser;
}
