import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./Addess";
import { hashPassword as globalHashPassword } from "../util/util";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'tinyint', default: 1 })
  level?: number;

  @Column({ type: 'varchar', length: 255, default: 'default.jpg' })
  avatar?: string;

  @Column({ type: 'datetime' })
  dateOfBirth: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToOne(type => Address)
  @JoinColumn()
  address: Address;

  @BeforeInsert()
  hashPassword() {
    this.password = globalHashPassword(this.password);
  }
}
