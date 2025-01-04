import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductDTO } from '../dto/request';
import { ProductEntity } from 'src/entities/product.entity';
import { JwtUser } from 'src/common/enums/index.enum';
import { IPaginateRequest, IPaginateResponse, IPaginationMeta } from 'src/interfaces/index-template.interface';

@Injectable()
export class ProductService {
  constructor(private readonly connection: Connection) {}

  async createProduct(payload: ProductDTO, user: JwtUser) {
    return await this.connection.transaction(async (entityManager) => {
      const existingData = await this.findByName(payload.name)

      console.log(existingData)

      if(existingData){
        throw new ConflictException(`Product ${payload.name} already exists`)
      }

      const result = await entityManager.save(ProductEntity,{
        name: payload.name,
        price: payload.price,
        createdBy: user.id,
      })

      return result
    })
  }

  async getAllProduct(payload: IPaginateRequest): Promise<any> {
    return await this.connection.transaction(async (entityManager) => {
      const page = payload.page || 1
      const perPage = payload.perPage || 10

      const skip = (page - 1) * perPage
      const take = perPage
      
      const queryBuilder = entityManager.createQueryBuilder(ProductEntity, 'product')

      queryBuilder.where('product.is_active = true')

      queryBuilder.skip(skip).take(take).getManyAndCount()

      const [data, total] = await Promise.all([
        queryBuilder.getMany(),
        queryBuilder.getCount()
      ])

      const meta: IPaginationMeta = {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }

      return {
        data,
        meta
      }
    })
  }

  async findByName(name: string) {
    return await this.connection.transaction(async (entityManager) => {
      const result = await entityManager.findOne(ProductEntity, {
        where: {name}
      })

      return result
    })
  }

  async getDetailProduct(id: string){
    return await this.connection.transaction(async (entityManager) => {
      const result = entityManager.findOne(ProductEntity, {
        where: {id}
      })

      if(!result){
        throw new NotFoundException(`Product not found`)
      }

      return result
    })
  }

  async deleteProduct(id: string, user: JwtUser){
    return await this.connection.transaction(async (entityManager) => {
      const existingData = this.getDetailProduct(id)

      if(!existingData){
        throw new NotFoundException(`Product not found`)
      }

      const result = entityManager.update(ProductEntity, id, {
        isActive: false,
        updatedBy: user.id
      })

      return result
    })
  }
}
