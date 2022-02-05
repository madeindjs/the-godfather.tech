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
      await this.viewsService.create(repository, campaign, req);
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=604800');
    res.send(badge);
  }
}
