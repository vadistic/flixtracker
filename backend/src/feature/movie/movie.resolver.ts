import { Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { Movie } from '@prisma/client'

import { PaginationArgs } from '../../common/pagination/pagination.args'
import { CommentModel } from '../comment/dto/comment.model'

import { MovieCreateInput } from './dto/movie-create.input'
import { MoviesFilterInput } from './dto/movie-filter.input'
import { MovieIdInput } from './dto/movie-id.input'
import { MovieOrderInput } from './dto/movie-order.input'
import { MovieUpdateInput } from './dto/movie-update.input'
import { MovieModel } from './dto/movie.model'
import { MovieService } from './movie.service'

@Resolver(() => MovieModel)
export class MovieResolver {
  constructor(readonly movieService: MovieService) {}

  @Query(returns => [MovieModel])
  async movies(
    @Args('where', { nullable: true }) where: MoviesFilterInput = {},
    @Args('order') order: MovieOrderInput,
    @Args() pag: PaginationArgs,
  ) {
    return this.movieService.findManyMovies({ ...where, ...order, ...pag })
  }

  @Query(returns => MovieModel, { nullable: true })
  async movie(@Args('where') where: MovieIdInput) {
    return this.movieService.findOneMovie(where)
  }

  @Mutation(returns => MovieModel, { nullable: true })
  async createMovie(@Args('data') data: MovieCreateInput) {
    return this.movieService.createMovie(data)
  }

  @Mutation(returns => MovieModel, { nullable: true })
  async updateMovie(@Args('where') where: MovieIdInput, @Args('data') data: MovieUpdateInput) {
    return this.movieService.updateMovie({ ...data, ...where })
  }

  @Mutation(returns => MovieModel, { nullable: true })
  async deleteMovie(@Args('where') where: MovieIdInput) {
    return this.movieService.deleteMovie(where)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  @ResolveField(type => [CommentModel])
  async comments(@Parent() movie: Movie) {
    return this.movieService.getRelatedComments(movie)
  }
}
