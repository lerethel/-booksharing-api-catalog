import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsInt()
  author: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsInt({ each: true })
  genres: number[];
}
