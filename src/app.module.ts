import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgoModule } from './ngo/ngo.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './shared/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-iron-east-02.cleardb.net',
      port: 3306,
      username: 'bd7de87cd48d9b',
      password: '223eebf2',
      database: 'heroku_b76067d1583b749',
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
