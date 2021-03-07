import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller()
export class AppController {
  @MessagePattern('nest')
  getNest(@Payload() payload: any, @Ctx() context: RedisContext): string {
    return `Hello from ${payload.framework} framework`;
  }

  @MessagePattern('observable')
  getObservable(): Observable<number> {
    return from([1, 2, 3]);
  }
}
