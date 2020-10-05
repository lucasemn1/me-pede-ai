import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Bag } from './Bag';
import { Address } from './Addess';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Bag)
  @JoinColumn()
  bag: Bag;

  @OneToOne(() => Address)
  @JoinColumn()
  sendTo: Address;
}
