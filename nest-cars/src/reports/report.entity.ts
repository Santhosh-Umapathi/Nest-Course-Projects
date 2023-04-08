import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Entity of Report Model
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: string;
  @Column()
  price: number;
}
