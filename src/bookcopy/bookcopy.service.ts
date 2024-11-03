import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  Populate,
  QueryOrder,
  wrap,
} from '@mikro-orm/postgresql';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateBookcopyDto } from './dto/create-bookcopy.dto';
import { Bookcopy } from './entities/bookcopy.entity';
import { BookcopyStatus } from './enums/bookcopy-status.enum';

@Injectable()
export class BookcopyService {
  constructor(
    @InjectRepository(Bookcopy)
    private readonly bookcopyRepository: EntityRepository<Bookcopy>,
    private readonly manager: EntityManager,
  ) {}

  async create(dto: CreateBookcopyDto, owner: number) {
    const bookcopy = this.bookcopyRepository.create({ ...dto, owner });
    await this.manager.flush();
    return bookcopy;
  }

  findAll(populate?: Populate<Bookcopy, string>) {
    return this.bookcopyRepository.findAll({
      orderBy: { status: QueryOrder.ASC },
      populate,
    });
  }

  findOne(id: number, populate?: Populate<Bookcopy, string>) {
    return this.bookcopyRepository.findOneOrFail(id, { populate });
  }

  async update(id: number, dto: CreateBookcopyDto) {
    const bookcopy = await this.bookcopyRepository.findOneOrFail(id);

    wrap(bookcopy).assign(dto);
    await this.manager.flush();

    return bookcopy;
  }

  async remove(id: number) {
    await this.bookcopyRepository.nativeDelete(id);
    return null;
  }

  async removeAllByOwner(owner: number) {
    await this.bookcopyRepository.nativeDelete({ owner });
    return null;
  }

  async loan(id: number, borrower: number, owner: number) {
    if (owner === borrower) {
      throw new ConflictException(
        'Owner and borrower cannot be the same person',
      );
    }

    const bookcopy = await this.bookcopyRepository.findOneOrFail(id);

    if (bookcopy.owner !== owner) {
      throw new ForbiddenException();
    }

    wrap(bookcopy).assign({ borrower, status: BookcopyStatus.Loaned });
    await this.manager.flush();

    return null;
  }

  async return(id: number, owner: number) {
    const bookcopy = await this.bookcopyRepository.findOneOrFail(id);

    if (bookcopy.owner !== owner) {
      throw new ForbiddenException();
    }

    wrap(bookcopy).assign({ borrower: null, status: BookcopyStatus.Available });
    await this.manager.flush();

    return null;
  }
}
