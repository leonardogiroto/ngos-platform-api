import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './commands/_index';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/entities/user.entity';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ User ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    ...CommandHandlers,
    JwtStrategy
  ],
})
export class AuthModule { }
