import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  Populate,
  QueryOrder,
  wrap,
} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: EntityRepository<Genre>,
    private readonly manager: EntityManager,
  ) {}

  async create(dto: CreateGenreDto) {
    const genre = this.genreRepository.create(dto);
    await this.manager.flush();
    return genre;
  }

  findAll(populate?: Populate<Genre, string>) {
    return this.genreRepository.findAll({
      orderBy: { name: QueryOrder.ASC },
      populate,
    });
  }

  findOne(id: number, populate?: Populate<Genre, string>) {
    return this.genreRepository.findOneOrFail(id, { populate });
  }

  async update(id: number, dto: CreateGenreDto) {
    const genre = await this.genreRepository.findOneOrFail(id);

    wrap(genre).assign(dto);
    await this.manager.flush();

    return genre;
  }

  async remove(id: number) {
    await this.genreRepository.nativeDelete(id);
    return null;
  }
}
