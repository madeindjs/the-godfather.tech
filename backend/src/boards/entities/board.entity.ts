import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', default: {} })
  data: any;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
}
