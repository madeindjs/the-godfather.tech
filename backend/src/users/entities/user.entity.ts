import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GithubInformation } from '../../github/github.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false, update: false })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  githubInformation: GithubInformation;

  @CreateDateColumn()
  createdAt: Date;
}
