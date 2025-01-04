import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PermissionCRUDApplication } from '../applications/permission-crud.application';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Permissions } from 'src/roles.decorator';
import { PermissionDTO } from '../dto/request.dto';
import { IApiResponse } from 'src/interfaces/response-template.interface';

@Controller('permission')
export class PermissionController {
  constructor(private permissionCRUDApp: PermissionCRUDApplication) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('WRITE_PERMISSION')
  async create(@Body() body: PermissionDTO) {
    const response = await this.permissionCRUDApp.create(body);

    return {
      message: 'Success.',
      data: response,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('WRITE_PERMISSION')
  async update(
    @Param('id') id: string,
    @Body() body: PermissionDTO,
  ): Promise<IApiResponse<any>> {
    const response = await this.permissionCRUDApp.update(id, body);

    return {
      message: 'Sucess.',
      data: response,
    };
  }
}
