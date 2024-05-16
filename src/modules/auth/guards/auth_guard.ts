import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(this.constructor.name);

  async canActivate(ctx: ExecutionContext) {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log(request);

    return true;
  }
}
