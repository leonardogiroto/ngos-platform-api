import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository } from 'typeorm';

export class ListNgosQuery {
  constructor(
    public page: number = 1,
    public pageSize: number = 10
  ) { }
}

@QueryHandler(ListNgosQuery)
export class ListNgosHandler implements IQueryHandler<ListNgosQuery> {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async execute(query: ListNgosQuery): Promise<Ngo[]> {
    return await this._ngoRepository.find();
  }

}
