import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { ExceptionsFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NGO\'s Platform API')
    .setVersion('1.0')
    .addTag('ngos')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  Sentry.init({ dsn: 'https://73212067ddda4160bb1052ee0411058e@sentry.io/1506604' });
  app.useGlobalFilters( new ExceptionsFilter() );

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
