import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
