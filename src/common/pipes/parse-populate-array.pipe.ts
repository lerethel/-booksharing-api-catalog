import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const rcomma = /\s*,\s*/;

@Injectable()
export class ParsePopulateArrayPipe implements PipeTransform {
  constructor(private readonly whitelist: string[]) {}

  transform(populate: string | undefined, metadata: ArgumentMetadata) {
    if (metadata.data !== 'populate' || !populate) {
      return populate;
    }

    const asArray = populate.split(rcomma);

    if (!asArray.every((field) => this.whitelist.includes(field))) {
      throw new BadRequestException(
        `Populate accepts only the following values: ${this.whitelist.join(', ')}`,
      );
    }

    return asArray;
  }
}
