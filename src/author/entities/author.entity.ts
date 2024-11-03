import { Collection, Entity, OneToMany, Opt, Property } from '@mikro-orm/core';
import { Book } from '../../book/entities/book.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Author extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  birthDate: Date;

  @Property()
  deathDate?: Date & Opt;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);
}
