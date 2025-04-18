import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Charity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', default: 0 })
  goalAmount: number;

  @Column({ type: 'decimal', default: 0 })
  receivedAmount: number;
}
