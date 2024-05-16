import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import User from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Add User
  create(userDto?: Partial<UserDto>): Promise<User> {
    const newCustomer = this.userRepo.create(userDto);
    return this.userRepo.save(newCustomer);
  }

  // Find One User
  findOne(findOpts: FindOneOptions<User>): Promise<User> {
    return this.userRepo.findOne(findOpts);
  }

  // Find Users
  findAllRecords(findOpts: FindManyOptions<User>): Promise<[User[], number]> {
    return this.userRepo.findAndCount(findOpts);
  }

  // Update User
  updateUser(id: string, updates: Partial<User>): void {
    this.userRepo.update({ id }, updates);
  }
}
