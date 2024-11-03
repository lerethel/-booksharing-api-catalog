import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Author } from '../author/entities/author.entity';
import { Genre } from '../genre/entities/genre.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Book, Author, Genre])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
