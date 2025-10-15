import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
  // Create a new user
  async create(user: Partial<User>): Promise<User> {
    return this.repo.save(this.repo.create(user));
  }
  // Get all users with their notes
  async findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['notes'] });
  }
}
