import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { EmailUtils } from 'src/shared/utils/email.utils';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { SignAccessTokenDto } from '../dtos/sign_access_token.dto';
import { apiResponse } from 'src/shared/helpers/api_response.helper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register user
  @Post('register')
  async addCustomer(@Body() userPayload: UserDto) {
    const validEmail = await EmailUtils.validateEmail(userPayload.email);
    if (!validEmail) {
      throw new HttpException(
        'Invalid email address',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const data = await this.authService.registerUser(userPayload);
    return apiResponse({
      data,
      message: 'User created successfully!',
    });
  }

  // Sign user & gen. token
  @Post('login')
  async signAccessToken(@Body() tokenPayload: SignAccessTokenDto) {
    const data = await this.authService.signAccessToken(tokenPayload);
    return apiResponse({
      data,
      message: 'Access token generated successfully!',
    });
  }
}
