import { Injectable } from '@nestjs/common';
import { CreateTokenDTO, UpdateTokenDTO } from '../dtos/request.dto';
import { IToken } from 'src/interfaces/token.interface';
import { Repository } from 'typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(body: CreateTokenDTO): Promise<IToken> {
    return await this.tokenRepository.save(body);
  }

  async findAll(): Promise<IToken[]> {
    return await this.tokenRepository.find();
  }

  async findByToken(token: string): Promise<IToken> {
    return await this.tokenRepository.findOne({
      where: {
        token: token,
      },
      relations: ['user'],
    });
  }

  async update(id: string, body: Partial<UpdateTokenDTO>): Promise<IToken> {
    return await this.tokenRepository.save({
      id,
      ...body,
      updatedAt: new Date(),
    });
  }

  async deleteToken(token: any): Promise<void> {
    await this.tokenRepository.delete({ token: token });
  }
}
