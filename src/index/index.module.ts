import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';
import { Bookcopy } from 'src/bookcopy/entities/bookcopy.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';

@Module({
  imports: [MikroOrmModule.forFeature([Author, Book, Bookcopy, Genre])],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
