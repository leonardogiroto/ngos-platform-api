import { ApiModelProperty } from '@nestjs/swagger';

export class CreateNgoDto {

  @ApiModelProperty()
  readonly name: string;

}
