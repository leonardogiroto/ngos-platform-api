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

  @Get()
  public async getAllOngs(
    @Query() request: ListNgosQuery,
    @Res() response
  ) {
    try {
      const ngos = await this.queryBus.execute(
        new ListNgosQuery(
          request.page,
          request.pageSize
        )
      );
      response.status(HttpStatus.OK).json(ngos);
    } catch (error) {
      // TODO: GENERAL ERROR HANDLING AND LOGGING
      // TODO: HANDLE AUTHENTICATION
      console.error(error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
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

    try {
      const newNgo = await this.commandBus.execute(
        new AddNgoCommand(
          request.name,
          request.description
        )
      );
      response.status(HttpStatus.CREATED).json(newNgo);

    } catch (error) {
      console.error(error);
      response.status(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      ).json(error);
    }
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
