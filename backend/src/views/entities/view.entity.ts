import { Request } from 'express';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from '../../campaigns/entities/campaign.entity';

export type ViewRequest = Pick<
  Request,
  'headers' | 'ip' | 'cookies' | 'baseUrl' | 'params' | 'originalUrl'
>;

@Entity()
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  repository: string;

  @Column({ type: 'jsonb', nullable: false })
  request: ViewRequest;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.id, { nullable: false })
  campaign: Campaign;

  @Column({ type: 'uuid' })
  campaignId: string;

  @CreateDateColumn()
  createdAt: Date;
}
