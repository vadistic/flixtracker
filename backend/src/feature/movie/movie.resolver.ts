import { Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { Movie } from '@prisma/client'

import { CommentModel } from '../comment/dto/comment.model'

import { MovieCreateInput } from './dto/movie-create.input'
import { MovieIdInput } from './dto/movie-id.input'
import { MovieUpdateInput } from './dto/movie-update.input'
import { MovieQueryArgs } from './dto/movie.args'
import { MovieModel } from './dto/movie.model'
import { MovieService } from './movie.service'

@Resolver(() => MovieModel)
export class MovieResolver {
  constructor(readonly movieService: MovieService) {}

  @Query(() => [MovieModel])
  async movies(@Args() { where, ...rest }: MovieQueryArgs) {
    return this.movieService.findManyMovies({ ...where, ...rest })
  }

  @Query(() => MovieModel, { nullable: true })
  async movie(@Args('where') where: MovieIdInput) {
    return this.movieService.findOneMovie(where)
  }

  @Mutation(() => MovieModel, { nullable: true })
  async createMovie(@Args('data') data: MovieCreateInput) {
    return this.movieService.createMovie(data)
  }

  @Mutation(() => MovieModel, { nullable: true })
  async updateMovie(@Args('where') where: MovieIdInput, @Args('data') data: MovieUpdateInput) {
    return this.movieService.updateMovie({ ...data, ...where })
  }

  @Mutation(() => MovieModel, { nullable: true })
  async deleteMovie(@Args('where') where: MovieIdInput) {
    return this.movieService.deleteMovie(where)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  @ResolveField(() => [CommentModel])
  async comments(@Parent() movie: Movie) {
    return this.movieService.getRelatedComments(movie)
  }
}
