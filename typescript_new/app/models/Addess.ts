import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Market } from './Market';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  country: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column()
  nigthborhood: string;

  @Column()
  zipCode: string;

  @Column()
  referencePoint: string;

  @Column()
  description: string;
  
  @Column()
  lat: number 

  @Column()
  lgt: number;

  @ManyToOne(() => Market, market => market.addresses)
  market: Market
}
