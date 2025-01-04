import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleCRUDApplication } from '../applications/role-crud.application';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { RoleRequestDTO } from '../dto/request.dto';
import { IApiResponse } from 'src/interfaces/response-template.interface';
import { Permissions } from 'src/roles.decorator';
import { RoleService } from '../services/role.service';
import { AssignPermissionDTO } from 'src/modules/permission/dto/request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('Setup Role')
export class RoleController {
  constructor(
    private roleCRUDApp: RoleCRUDApplication,
    private roleService: RoleService,
  ) {}

  @Put('/assign-permissions/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('WRITE_PERMISSION')
  @ApiBearerAuth()
  async assignPermission(
    @Param('id') id: string,
    @Body() body: AssignPermissionDTO,
  ): Promise<IApiResponse<any>> {
    const response = await this.roleCRUDApp.assignPermission(id, body);

    return {
      message: 'Success',
      data: response,
    };
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('WRITE_ROLE')
  @ApiBearerAuth()
  async create(@Body() body: RoleRequestDTO): Promise<IApiResponse<any>> {
    const response = await this.roleCRUDApp.createRole(body);

    return {
      message: 'Success',
      data: response,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('WRITE_ROLE')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() body: RoleRequestDTO,
  ): Promise<IApiResponse<any>> {
    const response = await this.roleCRUDApp.updateRole(id, body);

    return {
      message: 'Success',
      data: response,
    };
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Permissions('READ_ROLE')
  @ApiBearerAuth()
  async getAll(): Promise<IApiResponse<any>> {
    const response = await this.roleService.findAll();

    return {
      message: 'Success',
      data: response,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Permissions('DELETE_ROLE')
  @ApiBearerAuth()
  async delete(@Param() id: string): Promise<IApiResponse<any>> {
    const response = await this.roleService.delete(id);

    return {
      message: 'Success',
      data: response,
    };
  }
}
