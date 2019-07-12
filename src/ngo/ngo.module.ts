import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { NgoController } from './ngo.controller';
import { Ngo } from './entities/ngo.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

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
