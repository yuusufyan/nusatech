import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IPermission } from 'src/interfaces/permission.interface';

export class PermissionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class AssignPermissionDTO {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({})
  permissions: string[] | IPermission[];
}
