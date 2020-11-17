import { Test, TestingModule } from '@nestjs/testing'
import { Movie } from '@prisma/client'

import { ConfigModule } from '../../module/config/config.module'

import { MovieModule } from './movie.module'
import { MovieService } from './movie.service'

describe('MovieService', () => {
  let service: MovieService
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [MovieModule, ConfigModule],
    }).compile()

    service = app.get(MovieService)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('basic', () => {
    it('should be defined', () => {
      expect(service).toBeDefined()
    })
  })

  let fixtureMovie: Movie

  describe('createMovie', () => {
    it('create some movie', async () => {
      const movie = await service.createMovie({ title: 'Children of Men' })

      expect(movie).toBeDefined()
      expect(movie.title).toBe('Children of Men')

      fixtureMovie = movie
    })

    it('does not allow to create it again', async () => {
      await expect(service.createMovie({ title: 'Children of Men' })).rejects.toMatchInlineSnapshot(
        `[Error: Movie already exists]`,
      )
    })

    it('does not allow to add unknown movies', async () => {
      await expect(service.createMovie({ title: 'aghaghagh' })).rejects.toMatchInlineSnapshot(
        `[Error: Movie not on omdb]`,
      )
    })
  })

  describe('findMovies', () => {
    it('finds many movies', async () => {
      const movies = await service.findManyMovies({})

      expect(movies?.length).toBeGreaterThan(0)
    })

    it('finds many movies with search filter', async () => {
      const movies = await service.findManyMovies({ year: fixtureMovie.year })

      expect(movies.every(m => m.year === fixtureMovie.year)).toBeTruthy()
      expect(movies.length).toBeGreaterThan(0)
    })

    it('finds one movie', async () => {
      const movie = await service.findOneMovie({ movieId: fixtureMovie.id })

      expect(movie).toMatchObject(fixtureMovie)
    })

    it('does not find not existing one', async () => {
      const movie = await service.findOneMovie({ movieId: 'asdasd' })

      expect(movie).toBe(null)
    })
  })

  describe('updateMovie', () => {
    it('works', async () => {
      const movie = await service.updateMovie({ movieId: fixtureMovie.id, plot: 'Boring.' })

      expect(movie.plot).toBe('Boring.')

      const moviePrim = await service.findOneMovie({ movieId: fixtureMovie.id })

      expect(moviePrim?.plot).toBe('Boring.')
    })
  })

  describe('delete movie', () => {
    it('works', async () => {
      await service.deleteMovie({ movieId: fixtureMovie.id })

      const moviePrim = await service.findOneMovie({ movieId: fixtureMovie.id })

      expect(moviePrim).toBe(null)
    })

    it('does not allow to delete movie again', async () => {
      await expect(service.deleteMovie({ movieId: fixtureMovie.id })).rejects.toMatchInlineSnapshot(
        `[Error: Movie not found]`,
      )
    })
  })
})
