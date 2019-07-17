import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

export class AddUserCommand {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) { }
}

@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {

  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>
  ) { }

  public async execute(request: AddUserCommand): Promise<void> {
    const userExists = this._userRepository.findOne({
      'email': request.email
    });

    if (userExists)
      throw new BadRequestException('User already exists');

    const newUser = User.prototype.create(
      request.name,
      request.email,
      request.password
    );

    await this._userRepository.save( newUser );
  }

}
