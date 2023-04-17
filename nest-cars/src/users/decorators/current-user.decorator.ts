import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom Decorator to get current user from request
export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.currentUser; //Coming from Custom Interceptor
  },
);
