import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('APP_SERVICE') private readonly client: ClientProxy) {}

  @Get('laravel')
  async getLaravel() {
    const res = this.client.send('laravel', { framework: 'laravel' });
    console.log(await res.pipe().toPromise());
    return res;
  }

  @Get('nest')
  getNest() {
    this.client.emit('laravel', 'hi');
    return this.client.send('nest', { framework: 'nestjs' });
  }

  @Get('observable')
  getObserv() {
    return this.client.emit('observable', '');
  }

  @Get('user/posts')
  getUserMe() {
    return this.client.send('get_my_posts', { userId: 1 });
  }
}
