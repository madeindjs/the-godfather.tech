import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { PaiementsService } from './paiements.service';

@Controller('/api/v1/paiements')
export class PaiementsController {
  constructor(private readonly paiementsService: PaiementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPaiementDto: CreatePaiementDto) {
    const { client_secret: clientSecret } = await this.paiementsService.create(
      createPaiementDto,
    );

    return { clientSecret };
  }

  // @Get()
  // findAll() {
  //   return this.paiementsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paiementsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePaiementDto: UpdatePaiementDto,
  // ) {
  //   return this.paiementsService.update(+id, updatePaiementDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paiementsService.remove(+id);
  // }
}
