import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  country: string;

  @Column('text')
  image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price_per_ton: number;

  @Column('int')
  offered_volume_in_tons: number;

  @Column('decimal', { precision: 10, scale: 2 })
  distribution_weight: number;

  @Column('varchar')
  supplier_name: string;

  @Column('date')
  earliest_delivery: string;

  @Column('text')
  description: string;
}