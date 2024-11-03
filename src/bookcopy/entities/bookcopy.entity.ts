import { Entity, Enum, ManyToOne, Opt, Property } from '@mikro-orm/core';
import { Book } from '../../book/entities/book.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { BookcopyStatus } from '../enums/bookcopy-status.enum';

@Entity()
export class Bookcopy extends BaseEntity {
  @Property()
  edition: string;

  @Enum(() => BookcopyStatus)
  status: BookcopyStatus & Opt = BookcopyStatus.Available;

  @ManyToOne()
  book: Book;

  @Property()
  owner: number;

  @Property({ hidden: true })
  borrower?: number & Opt;
}
