import { ForeignKeyConstraintViolationException } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Catch,
  ConflictException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(ForeignKeyConstraintViolationException)
export class ForeignKeyNotFoundExceptionFilter implements RpcExceptionFilter {
  catch() {
    return throwError(
      () =>
        new RpcException(
          new BadRequestException(
            'One of the provided fields refers to a non-existent entity',
          ),
        ),
    );
  }
}

@Catch(ForeignKeyConstraintViolationException)
export class ForeignKeyHasRefsExceptionFilter implements RpcExceptionFilter {
  catch() {
    return throwError(
      () =>
        new RpcException(
          new ConflictException(
            'The entity cannot be deleted since it is referred to by other entities',
          ),
        ),
    );
  }
}
