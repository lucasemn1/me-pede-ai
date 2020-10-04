import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Market } from './Market';

@Entity({ name: 'bags' })
export class Bag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  finish: boolean;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => Market)
  market: Market;
}
