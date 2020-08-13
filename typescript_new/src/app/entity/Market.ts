import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert, JoinColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Address } from "./Addess";

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
  isOpen: boolean

  @Column()
  picture: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToOne(type => Address)
  @JoinColumn()
  address: Address;
}
