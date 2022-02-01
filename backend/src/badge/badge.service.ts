import { Injectable } from '@nestjs/common';
import { makeBadge } from 'badge-maker';

@Injectable()
export class BadgeService {
  makeBadge(format) {
    return makeBadge(format);
  }
}
