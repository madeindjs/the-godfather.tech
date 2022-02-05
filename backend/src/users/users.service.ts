import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, githubInformation }: CreateUserDto) {
    console.log(githubInformation);

    const user = await this.userRepository.save({
      email: email.toLowerCase(),
      githubInformation,
    });

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  findOneBy(field: keyof User, value: string) {
    return this.userRepository.findOne({ [field]: value });
  }

  findOneByEmail(email: string) {
    return this.findOneBy('email', email);
  }

  async update(
    id: string,
    { password, resetPasswordToken, metadata }: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    return this.userRepository.remove(user);
  }
}
