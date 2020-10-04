import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Market } from './Market';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Market, market => market.images, { nullable: true })
  market: Market;
}
