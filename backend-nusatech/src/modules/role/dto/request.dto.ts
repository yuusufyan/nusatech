import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IPermission } from 'src/interfaces/permission.interface';

export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}

export class RoleRequestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsArray()
  @IsString({ each: true })
  permissions: string[] | IPermission[];
}
