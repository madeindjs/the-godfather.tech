import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'numeric', nullable: false })
  amountPerDay: number;

  @Column({ type: 'text', array: true, default: [], nullable: false })
  tags: string[];

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;
}
