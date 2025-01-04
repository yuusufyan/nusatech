import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dto/request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'role.permissions'],
    });
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['role', 'role.permissions'],
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'role.permissions'],
    });
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find({
      relations: ['role'],
    });
  }

  // async findByToken(refreshToken: string): Promise<IUser> {
  //   return await this.userRepository.findOne({
  //     where: { refreshToken },
  //     relations: ['role', 'role.permissions'],
  //   });
  // }

  async create(body: CreateUserDTO): Promise<IUser> {
    return await this.userRepository.save(body);
  }

  async update(id: string, body: Partial<UpdateUserDTO>): Promise<IUser> {
    return await this.userRepository.save({
      id,
      ...body,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<IUser> {
    return await this.delete(id);
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compareHash(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
}
