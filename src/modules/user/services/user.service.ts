import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import User from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { UserEvents } from 'src/shared/events/user.events';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private userEvent: EventEmitter2,
  ) {}

  // Add User
  async addUser(userDto: UserDto): Promise<User> {
    const user = await this.userRepo.create(userDto);
    this.userEvent.emit(UserEvents.CREATED, user);
    return user;
  }

  // Find User
  findOne(findOpts: FindOneOptions<User>): Promise<User> {
    return this.userRepo.findOne(findOpts);
  }

  // Find User ByEmail
  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  // Find User ById
  findOneById(id: string): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  // Fetch Users
  fetchUsers(findOpts: FindManyOptions<User>): Promise<any> {
    return this.userRepo.findAllRecords(findOpts);
  }

  // Update User
  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    await this.userRepo.updateUser(id, updates);
  }
}
