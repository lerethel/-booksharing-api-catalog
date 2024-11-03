import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Scope } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { BookcopyModule } from './bookcopy/bookcopy.module';
import { GenreModule } from './genre/genre.module';
import { IndexModule } from './index/index.module';
import config from './mikro-orm.config';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    BookcopyModule,
    GenreModule,
    IndexModule,
    MikroOrmModule.forRoot({
      ...config,
      // https://github.com/mikro-orm/mikro-orm/discussions/2531
      registerRequestContext: false,
      scope: Scope.REQUEST,
    }),
  ],
})
export class AppModule {}
