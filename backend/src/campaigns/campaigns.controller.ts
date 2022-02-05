import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('api/v1/campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: Req & { user: User },
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    return this.campaignsService.create(createCampaignDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Req & { user: User }) {
    return this.campaignsService.findAllSummaryForUser(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: Req & { user: User }, @Param('id') id: string) {
    return this.getCampaign(id, req.user);
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // async update(
  //   @Request() req: Req & { user: User },
  //   @Param('id') id: string,
  //   @Body() updateCampaignDto: UpdateCampaignDto,
  // ) {
  //   const campaign = await this.getCampaign(id, req.user);
  //   return this.campaignsService.update(campaign.id, updateCampaignDto);
  // }

  @Post(':id/activate')
  @UseGuards(JwtAuthGuard)
  async toggleActivate(
    @Request() req: Req & { user: User },
    @Param('id') id: string,
  ) {
    const campaign = await this.getCampaign(id, req.user);
    return this.campaignsService.toggleActivate(campaign);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req: Req & { user: User }, @Param('id') id: string) {
    const campaign = await this.getCampaign(id, req.user);
    return this.campaignsService.remove(campaign.id);
  }

  private async getCampaign(id: string, user: User) {
    const campaign = await this.campaignsService.findOne(id);

    if (campaign === undefined) {
      throw new NotFoundException();
    }

    if (campaign.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return campaign;
  }
}
