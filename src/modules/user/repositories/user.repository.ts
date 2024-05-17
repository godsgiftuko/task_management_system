import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import User from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
  ) {}

  // Add User
  create(userDto?: Partial<UserDto>): Promise<User> {
    const newCustomer = this.userEntity.create(userDto);
    return this.userEntity.save(newCustomer);
  }

  // Find One User
  findOne(findOpts: FindOneOptions<User>): Promise<User> {
    return this.userEntity.findOne(findOpts);
  }

  // Find Users
  findAllRecords(findOpts: FindManyOptions<User>): Promise<[User[], number]> {
    return this.userEntity.findAndCount(findOpts);
  }

  // Update User
  updateUser(id: string, updates: Partial<User>): void {
    this.userEntity.update({ id }, updates);
  }
}
