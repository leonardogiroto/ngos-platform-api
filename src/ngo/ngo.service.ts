import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from './entities/ngo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NgoService {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async getAllNgos(): Promise<Ngo[]> {
    return await this._ngoRepository.find();
  }

}
