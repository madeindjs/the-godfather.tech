import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GithubInformation } from '../interface/information.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false, update: false })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  githubInformation: GithubInformation;

  @Column({ type: 'text', default: '{}' })
  metadata: string;

  toPublicObject() {
    return {
      email: this.email,
      metadata: JSON.parse(this.metadata),
    };
  }
}
