import { Customer } from './../entities/customer.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCustomer = createParamDecorator(
  (_data, ctx: ExecutionContext): Customer => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
