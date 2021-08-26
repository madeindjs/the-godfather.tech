import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
  ) {}

  createFromRequest(request: Request, user: User, amount: number = -1) {
    const params = { ...request.body };
    params.user = undefined;

    return this.creditRepository.save({
      user,
      amount,
      metadata: JSON.stringify({
        method: request.method,
        url: request.url,
        parameters: params,
      }),
    });
  }

  addToUser(user: User, amount: number = 1) {
    return this.creditRepository.save({ user, amount });
  }

  async getAmount(user: User): Promise<number> {
    const { amount } = await this.creditRepository
      .createQueryBuilder()
      .select('SUM(amount) AS amount')
      .where({ user })
      .getRawOne();

    return amount;
  }

  findAll(user: User) {
    return this.creditRepository.find({ user });
  }

  findOne(id: number) {
    return this.creditRepository.findOne({ id });
  }
}
