import { Address } from './Addess';
import PasswordUtil from '../../util/PasswordUtil';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  bornDate: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = PasswordUtil.hashPassword(this.password);
  }
}
