import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { View } from '../../views/entities/view.entity';

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

  @Column({ type: 'timestamp', nullable: true })
  deactivateAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @OneToMany(() => View, (view) => view.campaign, { nullable: false })
  views: View[];

  @Column({ type: 'uuid' })
  userId: string;
}
