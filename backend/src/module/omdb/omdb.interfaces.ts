export type OmdbResponse<T> =
  | {
      Response: 'False'
      Error: string
    }
  | ({ Response: 'True' } & T)

/**
 * @example { "Source": "Internet Movie Database", "Value": "8.1/10" }
 */
export interface OmdbRating {
  Source: string
  Value: string
}

export type OmdbResultType = 'movie' | 'series' | 'episode'

export type OmdbPlotType = 'short' | 'long'

export interface OmdbMovie {
  /** @example 'Kill Bill: Vol. 1' */
  Title: string
  /** @example '2003' */
  Year: string
  /** @example 'R' */
  Rated: string
  /** @example '10 Oct 2003' */
  Released: string
  /** @example '111 min' */
  Runtime: string
  /** @example 'Action, Crime, Thriller' */
  Genre: string
  /** @example 'Quentin Tarantino' */
  Director: string
  /** @example 'Quentin Tarantino, Quentin Tarantino (character The Bride), Uma Thurman (character The Bride)' */
  Writer: string
  /** @example 'Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah' */
  Actors: string
  /** @example 'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.' */
  Plot: string
  /** @example 'English, Japanese, French' */
  Language: string
  /** @example 'USA, Japan' */
  Country: string
  /** @example 'Nominated for 1 Golden Globe. Another 29 wins & 102 nominations.' */
  Awards: string
  /** @example 'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' */
  Poster: string
  /** @example [{ "Source": "Internet Movie Database", "Value": "8.1/10" }] */
  Ratings: OmdbRating[]
  /** @example '69' */
  Metascore: string
  /** @example '8.1' */
  imdbRating: string
  /** @example '983,396' */
  imdbVotes: string
  /** @example 'tt0266697' */
  imdbID: string
  /** @example 'movie' */
  Type: OmdbResultType
  /** @example 'N/A' */
  DVD: 'N/A'
  /** @example 'N/A' */
  BoxOffice: string
  /** @example 'A Band Apart' */
  Production: string
  /** @example 'N/A' */
  Website: string
}

export interface OmdbMovieItem {
  /** @example 'Kill Bill: Vol. 1' */
  Title: string
  /** @example '2003' */
  Year: string
  /** @example 'tt0266697' */
  imdbID: string
  /** @example 'movie' */
  Type: OmdbResultType
  /** @example 'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' */
  Poster: string
}

export interface OmdbMoviesList {
  Search: OmdbMovieItem[]
  totalResults: '10'
}
