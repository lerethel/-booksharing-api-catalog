import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
