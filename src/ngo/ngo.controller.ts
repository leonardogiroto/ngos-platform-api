import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListNgosQuery } from './queries/list-ngos.query';
import { AddNgoCommand } from './commands/add-ngo.command';

@Controller('ngo')
export class NgoController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  // TODO: HANDLE AUTHENTICATION

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
  public getOngById(
    @Param('id') ngoId: number
  ): string {
    return '';
  }

  // @ApiBearerAuth()
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

  @Put(':id')
  public updateOng(
    @Body() request
  ): string {
    return '';
  }

  @Delete(':id')
  public deleteOng(): string {
    return '';
  }

}
