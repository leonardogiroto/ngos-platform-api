import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './commands/login.command';
import { AddUserCommand } from './commands/add-user.command';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @Post('login')
  public async login(
    @Body() request: LoginCommand,
    @Res() response
  ): Promise<void> {
    const tokenInfo = await this.commandBus.execute(
      new LoginCommand(
        request.email,
        request.password
      )
    );
    response.status(HttpStatus.OK).json(tokenInfo);
  }

  @Post('user')
  public async addUser(
    @Body() request: AddUserCommand,
    @Res() response
  ): Promise<void> {
    const newNgo = await this.commandBus.execute(
      new AddUserCommand(
        request.name,
        request.email,
        request.password
      )
    );
    response.status(HttpStatus.CREATED).json(newNgo);
  }

}
