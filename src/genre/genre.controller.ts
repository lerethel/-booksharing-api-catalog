import { Controller, UsePipes } from '@nestjs/common';
import { BaseControllerFactory } from 'src/common/base.controller';
import { ParsePopulateArrayPipe } from 'src/common/pipes/parse-populate-array.pipe';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

@Controller('genre')
@UsePipes(
  new ValidateDtoPipe(CreateGenreDto),
  new ParsePopulateArrayPipe(['books']),
)
export class GenreController extends BaseControllerFactory<
  Genre,
  GenreService,
  CreateGenreDto
>({
  create: 'createGenre',
  findAll: 'findAllGenres',
  findOne: 'findOneGenre',
  update: 'updateGenre',
  remove: 'deleteGenre',
}) {
  constructor(genreService: GenreService) {
    super(genreService);
  }
}
