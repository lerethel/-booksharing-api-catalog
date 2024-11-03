import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  Populate,
  QueryOrder,
  wrap,
} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>,
    private readonly manager: EntityManager,
  ) {}

  async create(dto: CreateAuthorDto) {
    const author = this.authorRepository.create(dto);
    await this.manager.flush();
    return author;
  }

  findAll(populate?: Populate<Author, string>) {
    return this.authorRepository.findAll({
      orderBy: { firstName: QueryOrder.ASC },
      populate,
    });
  }

  findOne(id: number, populate?: Populate<Author, string>) {
    return this.authorRepository.findOneOrFail(id, { populate });
  }

  async update(id: number, dto: CreateAuthorDto) {
    const author = await this.authorRepository.findOneOrFail(id);

    wrap(author).assign(dto);
    await this.manager.flush();

    return author;
  }

  async remove(id: number) {
    await this.authorRepository.nativeDelete(id);
    return null;
  }
}
