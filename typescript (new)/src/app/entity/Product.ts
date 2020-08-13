import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  picture: string;

  @Column({ type: 'smallint' })
  stock: number;
}
