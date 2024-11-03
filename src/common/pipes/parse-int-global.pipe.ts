import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntGlobalPipe implements PipeTransform {
  async transform(id: string, metadata: ArgumentMetadata) {
    if (metadata.data !== 'id' && metadata.data !== 'borrower') {
      return id;
    }

    try {
      return await new ParseIntPipe().transform(id, metadata);
    } catch {
      throw new BadRequestException(`${metadata.data} must be an integer`);
    }
  }
}
