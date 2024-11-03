import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Author } from '../../author/entities/author.entity';
import { Bookcopy } from '../../bookcopy/entities/bookcopy.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Genre } from '../../genre/entities/genre.entity';

@Entity()
export class Book extends BaseEntity {
  @Property()
  title: string;

  @Property({ type: 'text' })
  summary: string;

  @ManyToOne()
  author: Author;

  @ManyToMany()
  genres = new Collection<Genre>(this);

  @OneToMany(() => Bookcopy, (bookcopy) => bookcopy.book)
  copies = new Collection<Bookcopy>(this);
}
