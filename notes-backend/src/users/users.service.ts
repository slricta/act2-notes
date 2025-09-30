import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.repo.save(this.repo.create(user));
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['notes'] });
  }
}
