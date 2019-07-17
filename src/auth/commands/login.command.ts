import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as crypto from 'crypto';

export class LoginCommand {
  constructor(
    public email: string,
    public password: string
  ) { }
}

export class TokenResource {
  constructor(
    public accessToken: string
  ) { }
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {

  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService
  ) { }

  public async execute(request: LoginCommand): Promise<TokenResource> {
    if (!request.email || !request.password)
      throw new UnauthorizedException('Login info not provided');

    const user = await this._userRepository.findOne({ 'email': request.email });
    const hashPassword = crypto.createHmac(
      'sha256', request.password
    ).digest('hex');

    if (user && user.password === hashPassword) {
      const payload = { username: user.email, sub: user.id };
      return {
        accessToken: this._jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Invalid username or password');
  }

}
