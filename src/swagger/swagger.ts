import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';

export const registerSwagger = (app: INestApplication): void => {
  const md = readFileSync(
    'src/swagger/documentation/Introduction.md',
    'utf8',
  ).toString();

  const config = new DocumentBuilder()
    .setTitle('Guess word')
    .setDescription(md)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('/docs', app, document, {
    explorer: false,
  });
};
