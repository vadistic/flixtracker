import { Injectable } from '@nestjs/common'
import axios from 'axios'
import qs from 'querystring'

import { RatingModel } from '../../feature/movie/dto/rating.model'
import { Config } from '../config/config'

import { OmdbSearchManyDto, OmdbSearchOneDto } from './omdb.dto'
import { OMDB_ERROR } from './omdb.errors'
import { OmdbMovie, OmdbMoviesList, OmdbRating, OmdbResponse } from './omdb.interfaces'
import { toArray, toDate, toFloat, toInt, toMovieType, toNullable } from './omdb.utils'

@Injectable()
export class OmdbService {
  constructor(readonly config: Config) {}

  fetcher = axios.create({
    baseURL: `http://www.omdbapi.com/`,
    params: {
      apikey: this.config.omdb.apikey,
      r: 'json',
    },
    timeout: 5000,
    responseType: 'json',
    paramsSerializer: params => {
      return qs.stringify(params)
    },
    validateStatus: () => true, // do not throw
  })

  async getMovie(params: OmdbSearchOneDto) {
    const movie = await this.fetchOne(params)

    if (movie) return this.convertMovie(movie)

    return undefined
  }

  async fetchOne(params: OmdbSearchOneDto): Promise<OmdbMovie | undefined> {
    const res = await this.fetcher.get<OmdbResponse<OmdbMovie>>('/', {
      params,
      timeout: 2000,
      responseType: 'json',
    })

    if (res.status === 200 && res.data && res.data.Response === 'True') {
      return res.data
    }

    if (res.status !== 200) {
      throw OMDB_ERROR.UNAVALIBLE()
    }

    return undefined
  }

  async fetchMany(params: OmdbSearchManyDto): Promise<OmdbMoviesList | undefined> {
    const res = await this.fetcher.get<OmdbResponse<OmdbMoviesList>>('/', {
      params,
      timeout: 2000,
      responseType: 'json',
    })

    if (
      res.status === 200 &&
      res.data &&
      res.data.Response === 'True' &&
      res.data.Search.length > 0
    ) {
      return res.data
    }

    if (res.status !== 200) {
      throw OMDB_ERROR.UNAVALIBLE()
    }

    return undefined
  }

  convertMovie(movie: OmdbMovie) {
    return {
      title: movie.Title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      year: toInt(movie.Year)!,
      type: toMovieType(movie.Type),
      imdbID: movie.imdbID,
      // collections
      country: toArray(movie.Country),
      genre: toArray(movie.Genre),
      language: toArray(movie.Language),
      ratings: movie.Ratings.map(rating => this.convertRating(rating)),
      // nullable
      released: toDate(movie.Released),
      actors: toNullable(movie.Actors),
      awards: toNullable(movie.Awards),
      boxOffice: toNullable(movie.BoxOffice),
      director: toNullable(movie.Director),
      dvd: toNullable(movie.DVD),
      website: toNullable(movie.Website),
      metascore: toInt(movie.Metascore),
      runtime: toNullable(movie.Runtime),
      poster: toNullable(movie.Poster),
      plot: toNullable(movie.Plot),
      imdbRating: toFloat(movie.imdbRating),
      imdbVotes: toInt(movie.imdbVotes),
      production: toNullable(movie.Production),
      rated: toNullable(movie.Rated),
      writer: toNullable(movie.Writer),
    }
  }

  convertRating(rating: OmdbRating): RatingModel {
    return {
      source: rating.Source,
      value: rating.Value,
    }
  }
}
