import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn } from './board-column.entity';
import { Board } from './board.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'uuid', nullable: false })
  columnId: string;

  @ManyToOne(() => BoardColumn, (column) => column.id, { nullable: false })
  column: BoardColumn;

  @Column({ type: 'uuid', nullable: false })
  boardId: string;

  @ManyToOne(() => Board, (board) => board.id, { nullable: false })
  board: Board;
}
