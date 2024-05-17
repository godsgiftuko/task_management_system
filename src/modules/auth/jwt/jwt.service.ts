import { Injectable } from '@nestjs/common';
import { configs } from 'config/config.env';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class JwtService {
  private readonly jwtPrivateKey: string;
  private readonly jwtExpiresIn = configs.JWT_EXPIRY;

  constructor() {
    this.jwtPrivateKey = configs.JWT_SECRET;
  }

  async generateAccessToken(userId: string) {
    const payload: JwtPayload = {
      id: userId,
    };
    return sign(payload, this.jwtPrivateKey, { expiresIn: this.jwtExpiresIn });
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
    } catch (error) {
      throw new Error('Invalid refresh token: ' + JSON.stringify(error));
    }
  }
}
