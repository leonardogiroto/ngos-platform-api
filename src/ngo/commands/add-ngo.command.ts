import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository } from 'typeorm';

export class AddNgoCommand {
  constructor(
    public name: string,
    public description: string
  ) { }
}

@CommandHandler(AddNgoCommand)
export class AddNgoHandler implements ICommandHandler<AddNgoCommand> {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async execute(request: AddNgoCommand): Promise<Ngo> {
    const newNgo = Ngo.prototype.create(
      request.name,
      request.description
    );

    return await this._ngoRepository.save( newNgo );
  }

}
