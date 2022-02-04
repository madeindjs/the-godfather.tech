import { Injectable, Logger } from '@nestjs/common';
import { Format, makeBadge } from 'badge-maker';
import { CampaignsService } from '../campaigns/campaigns.service';
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

    try {
      const info = await this.githubService.getRepositoryInformation(
        repository,
      );
      this.logger.debug(info);
      const campaigns = await this.campaignsService.findForTags(['js']);
    } catch (e) {
      // return default
      this.logger.error(e);
    }

    // TODO check if we should fetch a campaign

    // TODO get

    return makeBadge({
      ...format,
      label: 'sponsor',
      message: this.unknownSponsorName,
      color: 'green',
    });
  }
}
