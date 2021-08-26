import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreditsGuard } from '../credits/credits.guard';
import { CreditsService } from '../credits/credits.service';
import { User } from '../users/entities/user.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { WebsitesService } from './websites.service';

@Controller('websites')
export class WebsitesController {
  constructor(
    private readonly websiteService: WebsitesService,
    private readonly creditsService: CreditsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreditsGuard)
  async create(
    @Request() req: Req & { user: User },
    @Body() createWebsiteDto: CreateWebsiteDto,
  ) {
    const existingWebsite = await this.websiteService.findOneBy(
      'url',
      createWebsiteDto.url,
    );

    if (existingWebsite !== undefined) {
      throw new BadRequestException({ url: 'already exists' });
    }

    createWebsiteDto.user = req.user;
    const { id, url } = await this.websiteService.create(createWebsiteDto);

    await this.creditsService.createFromRequest(req, req.user);

    return { id, url };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Request & { user: User }) {
    return this.websiteService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: Request & { user: User }, @Param('id') id: string) {
    return this.websiteService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: Request & { user: User }, @Param('id') id: string) {
    return this.websiteService.remove(+id);
  }
}
