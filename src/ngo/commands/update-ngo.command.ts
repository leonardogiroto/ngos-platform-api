import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class UpdateNgoCommand {
  constructor(
    public id: number,
    public name?: string,
    public description?: string
  ) { }
}

@CommandHandler(UpdateNgoCommand)
export class UpdateNgoHandler implements ICommandHandler<UpdateNgoCommand> {

  constructor(
    @InjectRepository(Ngo)
    private readonly _ngoRepository: Repository<Ngo>
  ) { }

  public async execute(request: UpdateNgoCommand): Promise<Ngo> {
    const ngo = await this._ngoRepository.findOne(request.id);

    if (!ngo)
      throw new NotFoundException('Ngo does not exist');

    ngo.name = request.name || ngo.name;
    ngo.description = request.description || ngo.description;

    return await this._ngoRepository.save( ngo );
  }

}
