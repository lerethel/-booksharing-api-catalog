import { Controller, UsePipes } from '@nestjs/common';
import { BaseControllerFactory } from 'src/common/base.controller';
import { ParsePopulateArrayPipe } from 'src/common/pipes/parse-populate-array.pipe';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('book')
@UsePipes(
  new ValidateDtoPipe(CreateBookDto),
  new ParsePopulateArrayPipe(['genres', 'copies', 'author']),
)
export class BookController extends BaseControllerFactory<
  Book,
  BookService,
  CreateBookDto
>({
  create: 'createBook',
  findAll: 'findAllBooks',
  findOne: 'findOneBook',
  update: 'updateBook',
  remove: 'deleteBook',
}) {
  constructor(bookService: BookService) {
    super(bookService);
  }
}
