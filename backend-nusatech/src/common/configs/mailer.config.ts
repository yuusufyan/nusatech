import { MailerOptions } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { config } from './index.config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { strict } from 'assert';

const templateDir = join(__dirname, '../..', 'common/templates');

fs.readdir(templateDir, (err, files) => {
  if (err) {
    Logger.error(err.message, 'Template Config');
  } else {
    Logger.log(`Template directory found`, 'TemplateDirectory');
  }
});

export const mailerConfig: MailerOptions = {
  transport: {
    host: config.mail.host,
    port: config.mail.port,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@marketteer.com>',
  },
  template: {
    dir: templateDir,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
