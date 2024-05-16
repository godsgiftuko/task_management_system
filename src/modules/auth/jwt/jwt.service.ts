import { Injectable } from '@nestjs/common';
import { configs } from 'config/config.env';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class CustomJwtService {
  private readonly jwtPrivateKey: string;
  private readonly jwtExpiresIn = '1';

  constructor() {
    this.jwtPrivateKey = configs.JWT_SECRET;
  }

  async generateAccessToken(userId: string) {
    const payload: JwtPayload = {
      id: userId,
    };
    return sign(payload, this.jwtPrivateKey, {
      expiresIn: this.jwtExpiresIn,
    });
  }

  async refreshToken(oldToken: string) {
    try {
      const decoded = verify(
        oldToken,
        this.jwtPrivateKey,
      ) as unknown as JwtPayload;
      const access_token = await this.generateAccessToken(decoded.id);
      return {
        access_token,
      };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }
}
