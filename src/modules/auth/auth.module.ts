import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt-strategy';
import { configs } from 'config/config.env';
import { UserModule } from '../user/user.module';
import { CustomJwtService } from './jwt/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [JwtService, JwtStrategy, AuthService, CustomJwtService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: configs.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
})
export class AuthModule {}
