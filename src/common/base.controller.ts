import { Populate } from '@mikro-orm/postgresql';
import { UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseService } from './base-service.interface';
import { BaseEntity } from './entities/base.entity';
import {
  ForeignKeyHasRefsExceptionFilter,
  ForeignKeyNotFoundExceptionFilter,
} from './filters/foreign-key-exceptions.filter';

export const BaseControllerFactory = <
  E extends BaseEntity,
  S extends BaseService<E, D>,
  D extends Record<string, any>,
>(messages: { [K in keyof BaseService<E, D>]: string }) => {
  abstract class BaseController {
    constructor(public readonly service: S) {}

    @MessagePattern({ cmd: messages.create })
    @UseFilters(ForeignKeyNotFoundExceptionFilter)
    create(@Payload('dto') dto: D, @Payload('owner') owner?: number) {
      return this.service.create(dto, owner);
    }

    @MessagePattern({ cmd: messages.findAll })
    findAll(@Payload('populate') populate?: Populate<E, string>) {
      return this.service.findAll(populate);
    }

    @MessagePattern({ cmd: messages.findOne })
    findOne(
      @Payload('id') id: number,
      @Payload('populate') populate?: Populate<E, string>,
    ) {
      return this.service.findOne(id, populate);
    }

    @MessagePattern({ cmd: messages.update })
    @UseFilters(ForeignKeyNotFoundExceptionFilter)
    update(@Payload('id') id: number, @Payload('dto') dto: D) {
      return this.service.update(id, dto);
    }

    @MessagePattern({ cmd: messages.remove })
    @UseFilters(ForeignKeyHasRefsExceptionFilter)
    remove(@Payload('id') id: number) {
      return this.service.remove(id);
    }
  }

  return BaseController;
};
