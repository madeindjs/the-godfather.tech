import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { Card } from './card.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  boardId: string;

  @ManyToOne(() => Board, (board) => board.id, { nullable: false })
  board: Board;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
