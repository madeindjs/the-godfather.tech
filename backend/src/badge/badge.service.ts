import { Injectable, Logger } from '@nestjs/common';
import { Format, makeBadge } from 'badge-maker';
import { CampaignsService } from '../campaigns/campaigns.service';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { GithubInformationFull } from '../github/github.interface';
import { GithubService } from '../github/github.service';

@Injectable()
export class BadgeService {
  private readonly styles = [
    'plastic',
    'flat',
    'flat-square',
    'for-the-badge',
    'social',
  ];
  private readonly unknownSponsorName = 'The name of the sponsor';
  private readonly logger = new Logger(BadgeService.name);

  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly githubService: GithubService,
  ) {}

  async makeBadge(repository: string, format: Pick<Format, 'style'>) {
    if (!this.styles.includes(format.style)) {
      format.style = 'flat';
    }

    const campaign = await this.findCampaign(repository);

    const message = campaign?.content ?? this.unknownSponsorName;

    const badge = makeBadge({
      ...format,
      label: 'sponsor',
      message,
      color: 'green',
    });

    return { badge, campaign };
  }

  private async findCampaign(repository: string): Promise<Campaign> {
    let info: GithubInformationFull;
    try {
      info = await this.githubService.getRepositoryInformation(repository);
      this.logger.debug(info);
    } catch (e) {
      this.logger.debug(
        `Cannot find information of repository ${repository} - ${JSON.stringify(
          e,
        )}`,
      );
      return undefined;
    }

    if (info.topics) {
      const campaigns = await this.campaignsService.findForTopics(info.topics);
      return campaigns.pop();
    }

    return undefined;
  }
}
