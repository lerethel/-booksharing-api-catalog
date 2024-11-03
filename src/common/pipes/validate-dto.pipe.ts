import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

// Since generics don't work with native NestJS DTO validation, use a custom implementation.

@Injectable()
export class ValidateDtoPipe implements PipeTransform {
  constructor(private readonly DtoClass: new (...args: any[]) => any) {}

  async transform(dto: Record<string, any>, metadata: ArgumentMetadata) {
    if (metadata.data !== 'dto') {
      return dto;
    }

    try {
      await validateOrReject(plainToInstance(this.DtoClass, dto));
      return dto;
    } catch (errors) {
      throw new BadRequestException(
        errors.map(({ property, constraints }: ValidationError) => ({
          property,
          errors: Object.values(constraints!),
        })),
      );
    }
  }
}
