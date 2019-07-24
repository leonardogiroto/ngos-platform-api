import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository, DeleteResult } from 'typeorm';

export class DeleteNgoCommand {
  constructor(
    public id: number
  ) { }
}

@CommandHandler(DeleteNgoCommand)
export class DeleteNgoHandler implements ICommandHandler<DeleteNgoCommand> {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async execute(request: DeleteNgoCommand): Promise<DeleteResult> {
    return await this._ngoRepository.delete({
      'id': request.id
    });
  }

}
