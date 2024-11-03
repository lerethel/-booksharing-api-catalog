import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookcopyDto {
  @IsString()
  @IsNotEmpty()
  edition: string;

  @IsInt()
  book: number;
}
