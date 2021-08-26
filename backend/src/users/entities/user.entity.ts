import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false, update: false })
  email: string;

  password: string;

  @Column({ type: 'text', nullable: false })
  passwordHashed: string;

  @Column({ type: 'text', nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'text', default: '{}' })
  metadata: string;

  toPublicObject() {
    return {
      email: this.email,
      metadata: JSON.parse(this.metadata),
    };
  }
}
