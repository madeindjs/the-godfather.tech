import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  metadata: string;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
