import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly filmRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createFilmDto: CreateMovieDto): Promise<Movie> {
    const { title, description, releaseYear, userId } = createFilmDto;

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const film = new Movie();
    film.title = title;
    film.description = description;
    film.releaseYear = releaseYear;
    film.user = user;

    return this.filmRepository.save(film);
  }

  async findAll(): Promise<Movie[]> {
    return this.filmRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.filmRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.filmRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!movie) {
      return null;
    }

    Object.assign(movie, updateMovieDto);

    return this.filmRepository.save(movie);
  }

  async remove(id: number): Promise<boolean> {
    const movie = await this.filmRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!movie) {
      return false;
    }
    await this.filmRepository.remove(movie);
    return true;
  }
}
