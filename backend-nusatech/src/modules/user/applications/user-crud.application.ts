import { RoleService } from 'src/modules/role/services/role.service';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, GetUserDTO, LoginUserDTO } from '../dto/request.dto';
import { IUser } from 'src/interfaces/user.interface';
import { Connection } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from 'src/modules/token/services/token.service';
import { CreateTokenDTO } from 'src/modules/token/dtos/request.dto';
import { IToken } from 'src/interfaces/token.interface';
import { TokenType, url } from 'src/common/enums/index.enum';
import * as dayjs from 'dayjs';
import { of } from 'rxjs';
import { config } from 'src/common/configs/index.config';
import { UserEntity } from 'src/entities/user.entity';
import { TokenEntity } from 'src/entities/token.entity';
import { MailService } from 'src/modules/mail/services/mail.service';
import { generateToken } from 'src/common/utils/index.util';

@Injectable()
export class UserCrudApplication {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private connection: Connection,
  ) {}

  async create(body: CreateUserDTO): Promise<IUser> {
    return await this.connection.transaction(async (entityManager) => {
      const emailExist = await this.userService.findByEmail(body.email);

      if (emailExist) {
        throw new ConflictException(`Email already exists`, null);
      }

      const existUsername = await this.userService.findByUsername(
        body.username,
      );

      if (existUsername) {
        throw new ConflictException(`Username already exists`, null);
      }

      const existRole = await this.roleService.findByCode(body.role);

      if (!existRole) {
        throw new ConflictException(`User role doesn't exists`, null);
      }

      const hash = await this.userService.getHash(body.password);
      const otp = generateToken();
      const usingURL = `${url.DEV}/user/activation?token=${otp}`;
      const slug = body.username.trim().replace(/\s+/g, '-').toLowerCase();

      const user = await this.userService.create({
        ...body,
        username: body.username.toLowerCase(),
        email: body.email,
        slug: slug,
        password: hash,
        role: existRole.id,
      });

      // await this.tokenService.create({
      //   token: otp,
      //   purpose: TokenType.OTP,
      //   expiredIn: dayjs().add(1, 'hour').toDate(),
      //   isActive: true,
      //   user: user,
      // });

      // await this.mailService.activationEmail({
      //   email: body.email,
      //   name: body.username,
      //   url: usingURL,
      //   token: otp,
      // });

      delete user.password;
      delete user.role;
      delete user.id;

      return user;
    });
  }

  async authenticate(
    body: LoginUserDTO,
    token: CreateTokenDTO,
    req: Request,
    res: Response,
  ): Promise<{ user: IUser; token: string }> {
    const cookies = req.cookies;

    const exist = await this.userService.findByEmail(body.email);

    if (!exist) {
      throw new NotFoundException(`Email doesn't exist`, null);
    }

    const isRightPassword = await this.userService.compareHash(
      body.password,
      exist.password,
    );

    if (!isRightPassword) {
      throw new BadRequestException(
        `Invalid credentials. Failed to Login`,
        null,
      );
    }

    if (!exist.isActive) {
      throw new ForbiddenException(`Your account has been banned`, null);
    }

    const existToken = await this.userService.findById(exist.id);

    if (existToken) {
      await this.tokenService.deleteToken(exist.id);
    }

    const accessToken = this.jwtService.sign({
      id: exist.id,
      username: exist.username,
    });

    const newRefreshToken = this.generateRefreshToken({
      id: exist.id,
      username: exist.username,
    });

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
      });
    }

    await this.tokenService.create({
      ...token,
      token: newRefreshToken,
      purpose: TokenType.AUTH,
      isActive: true,
      expiredIn: dayjs().add(7, 'day').toDate(),
      user: exist,
    });

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
    });

    delete body.password;
    delete exist.password;
    // delete exist.refreshToken;

    return { user: exist, token: accessToken };
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new UnauthorizedException(`No token provided`, null);
    }

    const refreshToken = cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true });

    const exist = await this.tokenService.findByToken(refreshToken);

    if (!exist) {
      const decodeToken = this.jwtService.decode(refreshToken);

      await this.tokenService.deleteToken(decodeToken.user);

      throw new ForbiddenException('Forbidden', null);
    }

    const accessToken = this.jwtService.sign({
      id: exist.user.id,
      username: exist.user.username,
    });

    const newRefreshToken = this.generateRefreshToken({
      id: exist.user.id,
      username: exist.user.username,
    });

    await this.tokenService.create({
      token: newRefreshToken,
      purpose: TokenType.AUTH,
      isActive: true,
      expiredIn: dayjs().add(1, 'day').toDate(),
      user: exist.user,
    });

    await this.tokenService.update(exist.id, {
      isActive: false,
    });

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
      });
    }

    res.cookie('jwt', newRefreshToken, { httpOnly: true });

    delete exist.user;

    return { token: accessToken };
  }

  async update(id: string, body: CreateUserDTO) {
    const existUser = await this.userService.findById(id);

    if (!existUser) {
      throw new ConflictException(`User does not exist`, null);
    }

    const hash = await this.userService.getHash(body.password);

    return await this.userService.update(id, {
      ...body,
      username: body.username.toLowerCase(),
      email: body.email,
      password: hash,
    });
  }

  async getUserAll(req: Request): Promise<IUser[]> {
    const user: any = req.user;

    if (user.role.code !== `SA`) {
      throw new UnauthorizedException(
        `You dont have permission to access this`,
      );
    }

    return await this.userService.findAll();
  }

  async getUserDetail(body: GetUserDTO): Promise<IUser> {
    const { email, username } = body;

    let user;
    if (email) {
      user = await this.userService.findByEmail(email);
    } else if (username) {
      user = await this.userService.findByUsername(username);
    } else {
      throw new BadRequestException(
        `At leasts one identifier email, username, or id must be provided`,
      );
    }

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    delete user.id;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.role;

    return user;
  }

  async activateAccount(token: string) {
    const existToken = await this.tokenService.findByToken(token);
    if (existToken.purpose !== 'OTP') {
      throw new BadRequestException(`Invalid Token Type`);
    }

    await this.connection.manager.save(UserEntity, {
      id: existToken.user.id,
      isActive: true,
      updatedAt: new Date(),
    });

    await this.connection.manager.save(TokenEntity, {
      id: existToken.id,
      isActive: false,
    });

    return;
  }

  generateRefreshToken(payload: { id: string; username: string }): string {
    const refreshTokenService = new JwtService({
      secret: config.jwt.refreshSecret,
    });

    return refreshTokenService.sign(payload, {
      expiresIn: config.jwt.refreshExpire,
    });
  }
}
