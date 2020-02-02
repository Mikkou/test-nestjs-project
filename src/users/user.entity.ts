import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName:string;

  @Column()
  lastName:string;

  @Column()
  gender:string;

  @Column('date')
  birthday:Date;

  @Column({ default: '' })
  avatar: string
}
