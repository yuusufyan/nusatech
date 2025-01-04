import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../services/user.service';
import { Command } from 'nestjs-command';
import UserSeed from '../seeders/user.seeder';

@Injectable()
export class UserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  @Command({
    command: 'seed:user',
    describe: 'create user account for testing',
  })
  async create() {
    const users = await this.userService.findAll();

    if (users.length > 0) {
      await Promise.all(
        UserSeed.map(async (body) => {
          const ifExists = users.some(
            (user) => user.username === body.username,
          );
        }),
      );
    }
  }
}
