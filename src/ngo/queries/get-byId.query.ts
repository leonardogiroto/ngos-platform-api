import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository } from 'typeorm';

export class GetNgoByIdQuery {
  constructor(
    public id: number
  ) { }
}

@QueryHandler(GetNgoByIdQuery)
export class GetNgoByIdHandler implements IQueryHandler<GetNgoByIdQuery> {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async execute(query: GetNgoByIdQuery): Promise<Ngo> {
    return await this._ngoRepository.findOne(query.id);
  }

}
