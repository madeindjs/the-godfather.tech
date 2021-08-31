import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BoardColumn } from './board-column.entity';
import { Card } from './card.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, default: 'Untitled' })
  name: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];

  @OneToMany(() => Card, (card) => card.board)
  cards: Card[];
}
