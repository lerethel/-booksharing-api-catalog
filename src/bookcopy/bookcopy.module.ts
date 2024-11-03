import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Book } from '../book/entities/book.entity';
import { BookcopyController } from './bookcopy.controller';
import { BookcopyService } from './bookcopy.service';
import { Bookcopy } from './entities/bookcopy.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Bookcopy, Book])],
  controllers: [BookcopyController],
  providers: [BookcopyService],
})
export class BookcopyModule {}
