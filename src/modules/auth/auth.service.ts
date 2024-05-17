import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { configs } from 'config/config.env';
import User from '../user/entities/user.entity';
import { UserDto } from '../user/dtos/user.dto';
import { UserService } from '../user/services/user.service';
import { SignAccessTokenDto } from './dtos/sign_access_token.dto';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  private readonly jwtPrivateKey: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtPrivateKey = configs.JWT_SECRET;
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  static comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  // Validate User
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const passwordMatch = await AuthService.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return null;
    }

    return user;
  }

  async registerUser(userDto: UserDto) {
    const exist = await this.userService.findOneByEmail(userDto.email);
    if (exist) {
      throw new HttpException(
        'Sorry! Email is unavailable',
        HttpStatus.BAD_REQUEST,
      );
    }
    userDto.password = await AuthService.hashPassword(userDto.password);
    return this.userService.addUser(userDto);
  }

  async signAccessToken(tokenPayload: SignAccessTokenDto) {
    const user = await this.userService.findOneByEmail(tokenPayload.email);

    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const match = await bcrypt.compare(tokenPayload.password, user.password);
    if (!match) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const access_token = await this.jwtService.generateAccessToken(user.id);
    return { ...user, tokens: { access_token } };
  }
}
