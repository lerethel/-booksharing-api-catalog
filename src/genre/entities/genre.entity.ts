import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Book } from '../../book/entities/book.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Genre extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books = new Collection<Book>(this);
}
