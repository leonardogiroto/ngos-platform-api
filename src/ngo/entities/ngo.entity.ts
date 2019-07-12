import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ngo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

}
