import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Block } from 'src/blocks/entities/block.entity';

export const GetBlock = createParamDecorator(
  (data, ctx: ExecutionContext): Block => {
    const req = ctx.switchToHttp().getRequest();
    return req.body.block;
  },
);
