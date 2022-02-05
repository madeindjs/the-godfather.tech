import { Controller, Get, Query, Request, Response } from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
import { ViewsService } from '../views/views.service';
import { BadgeService } from './badge.service';

@Controller('api/v1/badge')
export class BadgeController {
  constructor(
    private readonly badgeService: BadgeService,
    private readonly viewsService: ViewsService,
  ) {}

  @Get('')
  async getSvg(
    @Response() res: Res,
    @Request() req: Req,
    @Query('repository')
    repository: string,
    @Query('style')
    style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social',
  ) {
    const { badge, campaign } = await this.badgeService.makeBadge(repository, {
      style,
    });

    if (
      campaign !== undefined &&
      true // req.headers.referer === 'https://github.com'
    ) {
      console.log(campaign);
      await this.viewsService.create({ ip: req.ip, campaign });
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge);
  }
}
