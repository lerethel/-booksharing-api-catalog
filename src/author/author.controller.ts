import { Controller, UsePipes } from '@nestjs/common';
import { BaseControllerFactory } from 'src/common/base.controller';
import { ParsePopulateArrayPipe } from 'src/common/pipes/parse-populate-array.pipe';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
@UsePipes(
  new ValidateDtoPipe(CreateAuthorDto),
  new ParsePopulateArrayPipe(['books']),
)
export class AuthorController extends BaseControllerFactory<
  Author,
  AuthorService,
  CreateAuthorDto
>({
  create: 'createAuthor',
  findAll: 'findAllAuthors',
  findOne: 'findOneAuthor',
  update: 'updateAuthor',
  remove: 'deleteAuthor',
}) {
  constructor(authorService: AuthorService) {
    super(authorService);
  }
}
