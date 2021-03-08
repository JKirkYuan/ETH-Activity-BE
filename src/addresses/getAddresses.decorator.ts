import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Address } from 'src/addresses/entities/address.entity';

export const GetAddresses = createParamDecorator(
  (data, ctx: ExecutionContext): Address => {
    const req = ctx.switchToHttp().getRequest();
    return req.body.addresses;
  },
);
