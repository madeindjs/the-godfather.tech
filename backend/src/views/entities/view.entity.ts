import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity()
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  ip: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.id, { nullable: false })
  campaign: Campaign;

  @Column({ type: 'uuid' })
  campaignId: string;

  @CreateDateColumn()
  createdAt: Date;
}
