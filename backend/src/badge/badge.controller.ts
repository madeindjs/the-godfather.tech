import { Controller, Get, Query, Request, Response } from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
import { BadgeService } from './badge.service';

@Controller('api/v1/badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('')
  getSvg(
    @Response() res: Res,
    @Request() req: Req,
    @Query('repository')
    repository: string,
    @Query('style')
    style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social',
  ) {
    req.ip;

    console.log(
      req.baseUrl,
      req.url,
      req.originalUrl,
      req.path,
      req.headers.referer,
    );
    // TODO get props
    const badge = this.badgeService.makeBadge(repository, {
      style,
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge);
  }
}
