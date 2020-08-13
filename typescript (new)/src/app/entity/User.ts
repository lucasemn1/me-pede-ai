import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Address } from "./Addess";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'tinyint', default: 1 })
  level: number;

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @Column({ type: 'datetime' })
  dateOfBirth: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToOne(type => Address)
  @JoinColumn()
  address: Address;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
