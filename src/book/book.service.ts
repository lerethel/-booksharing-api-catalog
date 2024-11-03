import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  Populate,
  QueryOrder,
  wrap,
} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    private readonly manager: EntityManager,
  ) {}

  async create(dto: CreateBookDto) {
    const book = this.bookRepository.create(dto);
    await this.manager.flush();
    return book;
  }

  findAll(populate?: Populate<Book, string>) {
    return this.bookRepository.findAll({
      orderBy: { title: QueryOrder.ASC },
      populate,
    });
  }

  findOne(id: number, populate?: Populate<Book, string>) {
    return this.bookRepository.findOneOrFail(id, { populate });
  }

  async update(id: number, dto: CreateBookDto) {
    const book = await this.bookRepository.findOneOrFail(id);

    wrap(book).assign(dto);
    await this.manager.flush();

    return book;
  }

  async remove(id: number) {
    await this.bookRepository.nativeDelete(id);
    return null;
  }
}
