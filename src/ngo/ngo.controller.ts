import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateNgoDto } from './dtos/create-ngo.dto';
import { NgoService } from './ngo.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('ngo')
export class NgoController {

  constructor(
    private readonly ngoService: NgoService
  ) { }

  @Get()
  @ApiOkResponse({ description: 'Records Retrieved Successfully'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error'})
  public async getAllOngs(
    @Res() response
  ) {
    try {
      const ngos = await this.ngoService.getAllNgos();
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

  @ApiBearerAuth()
  @Post()
  public addOng(
    @Body() request: CreateNgoDto
  ): string {
    return '';
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
