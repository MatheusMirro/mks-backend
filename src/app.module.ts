import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configurações de conexão com o banco de dados
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mks-movies-database',
      entities: [User, Movie],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([User, Movie]),
    MoviesModule,
  ],

  providers: [AuthService, JwtService, JwtStrategy],
})
export class AppModule {}
