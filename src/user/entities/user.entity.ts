import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac(
      'sha256', this.password
    ).digest('hex');
  }
  @Column()
  password: string;

  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  public create(
    name: string, email: string, password: string
  ): User {
    if (!name)
      throw new BadRequestException('Name cannot be empty');

    if (!email)
      throw new BadRequestException('Email cannot be empty');

    if (!password)
      throw new BadRequestException('Password cannot be empty');

    return new User(name, email, password);
  }

}
