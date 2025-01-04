import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivationDTO } from '../dto/request.dto';
import { config } from 'src/common/configs/index.config';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async activationEmail(user: ActivationDTO) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Account Activation',
        template: './activation',
        context: {
          appName: config.name,
          name: user.name,
          url: user.url,
        },
      });
    } catch (error) {
      throw new BadRequestException({ message: error?.message, error: [] });
    }
  }
}
