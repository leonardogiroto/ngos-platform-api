import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgoModule } from './ngo/ngo.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './shared/http-exception.filter';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.CLEARDB_HOST,
      port: 3306,
      username: process.env.CLEARDB_USERNAME,
      password: process.env.CLEARDB_PASSWORD,
      database: process.env.CLEARDB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NgoModule
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: ExceptionsFilter
  }]
})
export class AppModule { }
