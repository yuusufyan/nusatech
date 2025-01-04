import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mailerConfig } from 'src/common/configs/mailer.config';
import { MailService } from './services/mail.service';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
