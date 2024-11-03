import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IndexService } from './index.service';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @MessagePattern({ cmd: 'getCounts' })
  getCounts() {
    return this.indexService.getCounts();
  }
}
