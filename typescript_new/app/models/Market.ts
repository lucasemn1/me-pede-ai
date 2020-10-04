import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './Addess';
import { User } from './User';
import { Image } from './Image';

@Entity({ name: 'markets' })
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  minDeliveryAmount: number;

  @Column({ type: 'boolean', default: false })
  isOpen: boolean;

  @Column()
  picture: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @OneToMany((type) => User, user => user.markets)
  user: User;

  @OneToMany((type) => Image, images => images.market)
  images: Image[]; 

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany((type) => Address, addresses => addresses.market)
  @JoinColumn()
  addresses: Address;
}
