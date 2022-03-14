import { Controller, Post } from '@nestjs/common';
import { ViewsService } from './views.service';

@Controller('api/v1/views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post('summary-by-repositories')
  getViewsByRepositories() {
    return this.viewsService.getReposSummary();
  }
}
