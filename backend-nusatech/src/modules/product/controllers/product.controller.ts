import { BadRequestException, Body, ConflictException, Controller, Delete, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { JwtAuthGuard } from 'src/modules/user/guards/jwt.guard';
import { ProductDTO } from '../dto/request';
import { IApiResponse } from 'src/interfaces/response-template.interface';
import { IPaginateRequest } from 'src/interfaces/index-template.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() payload: ProductDTO, @Request() jwtUser): Promise<IApiResponse<any>>{
    try {
      const result = await this.productService.createProduct(payload, jwtUser.user)

      return {
        message: 'Product created successfully',
        data: result
      }
    } catch (err) {
      console.log(err, '<<< Error')

      switch (err.status) {
        case 409:
          throw new ConflictException(err.message);
        case 404:
          throw new NotFoundException(err.message);
        case 400:
          throw new BadRequestException(err.message);
        case 401:
          throw new ForbiddenException(err.message);
        case 403:
          throw new UnauthorizedException(err.message);
        default:
          throw new InternalServerErrorException('Something went wrong.');
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProduct(@Query() payload: IPaginateRequest): Promise<IApiResponse<any>> {
    try {
      const result = await this.productService.getAllProduct(payload)

      return {
        message: 'Get all product successfully',
        data: result
      }
    } catch (err) {
      console.log(err, '<<< Error')

      switch (err.status) {
        case 409:
          throw new ConflictException(err.message);
        case 404:
          throw new NotFoundException(err.message);
        case 400:
          throw new BadRequestException(err.message);
        case 401:
          throw new ForbiddenException(err.message);
        case 403:
          throw new UnauthorizedException(err.message);
        default:
          throw new InternalServerErrorException('Something went wrong.');
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getDetailProduct(@Param('id') id: string): Promise<IApiResponse<any>> {
    try {
      const result = await this.productService.getDetailProduct(id)

      return {
        message: 'Get detail product successfully',
        data: result
      }
    } catch (err) {
      console.log(err, '<<< Error')

      switch (err.status) {
        case 409:
          throw new ConflictException(err.message);
        case 404:
          throw new NotFoundException(err.message);
        case 400:
          throw new BadRequestException(err.message);
        case 401:
          throw new ForbiddenException(err.message);
        case 403:
          throw new UnauthorizedException(err.message);
        default:
          throw new InternalServerErrorException('Something went wrong.');
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string, @Request() jwtUser): Promise<IApiResponse<any>> {
    try {
      const result = await this.productService.deleteProduct(id, jwtUser.user)

      return {
        message: 'Product deleted successfully',
        data: []
      }
    } catch (err) {
      console.log(err, '<<< Error')

      switch (err.status) {
        case 409:
          throw new ConflictException(err.message);
        case 404:
          throw new NotFoundException(err.message);
        case 400:
          throw new BadRequestException(err.message);
        case 401:
          throw new ForbiddenException(err.message);
        case 403:
          throw new UnauthorizedException(err.message);
        default:
          throw new InternalServerErrorException('Something went wrong.');
      }
    }
  }
}
