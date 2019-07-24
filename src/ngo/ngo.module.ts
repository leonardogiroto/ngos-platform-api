import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { NgoController } from './ngo.controller';
import { Ngo } from './entities/ngo.entity';
import { QueryHandlers } from './queries/_index';
import { CommandHandlers } from './commands/_index';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ Ngo ])
  ],
  controllers: [
    NgoController
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers
  ],
})
export class NgoModule { }
