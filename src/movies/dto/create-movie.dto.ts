import {
  IsString,
  IsNotEmpty,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title should have at least 3 characters' })
  @MaxLength(100, { message: 'Title should have at most 100 characters' })
  readonly title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description should have at least 10 characters' })
  @MaxLength(500, { message: 'Description should have at most 500 characters' })
  readonly description: string;

  @IsNotEmpty({ message: 'Release year should not be empty' })
  @IsInt({ message: 'Release year must be an integer' })
  @IsPositive({ message: 'Release year must be a positive number' })
  readonly releaseYear: number;

  @IsInt({ message: 'User ID must be an integer' })
  @IsPositive({ message: 'User ID must be a positive number' })
  readonly userId: number;
}
