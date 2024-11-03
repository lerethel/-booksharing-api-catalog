import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseControllerFactory } from 'src/common/base.controller';
import { ParsePopulateArrayPipe } from 'src/common/pipes/parse-populate-array.pipe';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { BookcopyService } from './bookcopy.service';
import { CreateBookcopyDto } from './dto/create-bookcopy.dto';
import { Bookcopy } from './entities/bookcopy.entity';

@Controller('bookcopy')
@UsePipes(
  new ValidateDtoPipe(CreateBookcopyDto),
  new ParsePopulateArrayPipe(['book']),
)
export class BookcopyController extends BaseControllerFactory<
  Bookcopy,
  BookcopyService,
  CreateBookcopyDto
>({
  create: 'createBookcopy',
  findAll: 'findAllBookcopies',
  findOne: 'findOneBookcopy',
  update: 'updateBookcopy',
  remove: 'deleteBookcopy',
}) {
  constructor(bookcopyService: BookcopyService) {
    super(bookcopyService);
  }

  @MessagePattern({ cmd: 'deleteAllBookcopiesByOwner' })
  removeAllByOwner(@Payload('owner') owner: number) {
    return this.service.removeAllByOwner(owner);
  }

  @MessagePattern({ cmd: 'loanBookcopy' })
  loan(
    @Payload('id') id: number,
    @Payload('borrower') borrower: number,
    @Payload('owner') owner: number,
  ) {
    return this.service.loan(id, borrower, owner);
  }

  @MessagePattern({ cmd: 'returnBookcopy' })
  return(@Payload('id') id: number, @Payload('owner') owner: number) {
    return this.service.return(id, owner);
  }
}
