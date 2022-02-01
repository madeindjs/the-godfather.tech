import { Controller, Get, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { BadgeService } from './badge.service';

@Controller('api/v1/badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('')
  getSvg(
    @Response() res: Res,
    @Query('repository') repository: string,
    @Query('style') style: string,
  ) {
    // TODO get props
    const badge = this.badgeService.makeBadge({
      label: 'sponsor',
      message: 'passed',
      color: 'green',
      style,
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge);
  }
}
