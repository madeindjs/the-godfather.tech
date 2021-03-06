import {
  Column,
  CreateDateColumn,
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

  @Column({ type: 'text', nullable: false, update: false })
  stripePaymentIntentId: string;

  @Column({ type: 'text', nullable: false, update: false })
  stripePaymentIClientSecret: string;

  @Column({ type: 'numeric', nullable: false, unsigned: true, update: false })
  amountPerDay: number;

  @Column({ type: 'numeric', default: 0, unsigned: true })
  currentPrice: number;

  @Column({ type: 'numeric', default: 0, unsigned: true, update: false })
  totalPrice: number;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  // BEGIN: criteria

  @Column({ type: 'int', nullable: true, unsigned: true, update: false })
  minStars: number;

  @Column({ type: 'int', nullable: true, unsigned: true, update: false })
  maxStars: number;

  @Column({
    type: 'text',
    array: true,
    default: [],
    nullable: true,
    update: false,
  })
  topics: string[];

  // END: criteria

  @Column({ type: 'timestamp', nullable: true })
  deactivateAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @OneToMany(() => View, (view) => view.campaign, { nullable: false })
  views: View[];

  @Column({ type: 'uuid', update: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
