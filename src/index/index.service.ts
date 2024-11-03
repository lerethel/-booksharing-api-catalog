import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';
import { Bookcopy } from 'src/bookcopy/entities/bookcopy.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Injectable()
export class IndexService {
  constructor(private readonly manager: EntityManager) {}

  async getCounts() {
    const [authors, books, bookcopies, genres] = await Promise.all(
      [Author, Book, Bookcopy, Genre].map((entity) =>
        this.manager.count(entity),
      ),
    );

    return { authors, books, bookcopies, genres };
  }
}
