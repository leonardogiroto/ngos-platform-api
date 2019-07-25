import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListNgosQuery } from './queries/list-ngos.query';
import { AddNgoCommand } from './commands/add-ngo.command';
import { GetNgoByIdQuery } from './queries/get-byId.query';
import { DeleteNgoCommand } from './commands/delete-ngo.command';
import { UpdateNgoCommand } from './commands/update-ngo.command';

@UseGuards(AuthGuard('jwt'))
@Controller('ngo')
export class NgoController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  @Get()
  public async getAllOngs(
    @Query() request: ListNgosQuery,
    @Res() response
  ) {
    const ngos = await this.queryBus.execute(
      new ListNgosQuery(
        request.page,
        request.pageSize
      )
    );
    response.status(HttpStatus.OK).json(ngos);
  }

  @Get(':id')
  public async getOngById(
    @Param('id') ngoId: number,
    @Res() response
  ) {
    const ngo = await this.queryBus.execute(
      new GetNgoByIdQuery( ngoId )
    );
    response.status(HttpStatus.OK).json(ngo);
  }

  @Post()
  public async addOng(
    @Body() request: AddNgoCommand,
    @Res() response
  ): Promise<void> {
    const newNgo = await this.commandBus.execute(
      new AddNgoCommand(
        request.name,
        request.description
      )
    );
    response.status(HttpStatus.CREATED).json(newNgo);
  }

  @Put()
  public async updateOng(
    @Body() request: UpdateNgoCommand,
    @Res() response
  ) {
    const ngo = await this.commandBus.execute(
      new UpdateNgoCommand(
        request.id,
        request.name,
        request.description
      )
    );
    response.status(HttpStatus.OK).json(ngo);
  }

  @Delete(':id')
  public async deleteOng(
    @Param('id') ngoId: number,
    @Res() response
  ) {
    await this.commandBus.execute(
      new DeleteNgoCommand( ngoId )
    );
    response.status(HttpStatus.OK).json();
  }

}
