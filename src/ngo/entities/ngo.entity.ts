import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Ngo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  constructor(
    private _name: string,
    private _description: string
  ) {
    this.name = _name;
    this.description = _description;
  }

  public create(
    name: string, description: string
  ): Ngo {
    if (!name)
      throw new BadRequestException('Name cannot be empty');

    if (!description)
      throw new BadRequestException('Description cannot be empty');

    return new Ngo(name, description);
  }

}
