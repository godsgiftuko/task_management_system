import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import User from './user.entity';

export class UserDto extends User {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
