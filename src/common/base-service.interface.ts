import { Populate } from '@mikro-orm/postgresql';

export interface BaseService<E, D> {
  create(dto: D, owner?: number): Promise<E>;

  findAll(populate?: Populate<E, string>): Promise<E[]>;

  findOne(id: number, populate?: Populate<E, string>): Promise<E>;

  update(id: number, dto: D): Promise<E>;

  remove(id: number): Promise<null>;
}
