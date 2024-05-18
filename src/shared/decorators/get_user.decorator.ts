import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request?.user;
    if (!user) return null;
    return prop ? user?.[prop] : user;
  },
);
