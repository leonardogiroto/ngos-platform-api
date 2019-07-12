import { Module } from '@nestjs/common';
import { NgoController } from './ngo.controller';
import { NgoService } from './ngo.service';
import { Ngo } from './entities/ngo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Ngo ])
  ],
  controllers: [
    NgoController
  ],
  providers: [
    NgoService
  ],
})
export class NgoModule { }
