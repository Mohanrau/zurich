import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCode: string;

  @Column()
  productDescription: string;

  @Column()
  location: string;

  @Column('decimal')
  price: number;
}
