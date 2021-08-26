import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { GithubUserSearchJob } from '../github-user/interfaces/github.interface';
import { HashService } from '../hash/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    @InjectQueue('github') private githubQueue: Queue<GithubUserSearchJob>,
  ) {}

  async create({ email, password }: CreateUserDto) {
    const user = await this.userRepository.save({
      email: email.toLowerCase(),
      passwordHashed: this.hashService.hashString(password),
    });

    await this.setBackgroundJobs(user);
    return user;
  }

  async setBackgroundJobs({ email }: User) {
    const job = await this.githubQueue.add({ email });
    this.logger.debug(`pushed job #${job?.id} as ${job?.name}`);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ id });
  }

  findOneBy(field: keyof User, value: string) {
    return this.userRepository.findOne({ [field]: value });
  }

  findOneByEmail(email: string) {
    return this.findOneBy('email', email);
  }

  async update(
    id: number,
    { password, resetPasswordToken, metadata }: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    if (password !== undefined) {
      user.passwordHashed = this.hashService.hashString(password);
    }

    if (resetPasswordToken !== undefined) {
      user.resetPasswordToken = resetPasswordToken;
    }

    if (metadata !== undefined) {
      const oldMetadata = JSON.parse(user.metadata);
      user.metadata = JSON.stringify({ ...oldMetadata, ...metadata });
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    return this.userRepository.remove(user);
  }
}
