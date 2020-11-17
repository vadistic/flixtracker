import { OmdbPlotType, OmdbResultType } from './omdb.interfaces'

export class OmdbSearchOneDto {
  /**	A valid IMDb ID (e.g. tt1285016) */
  i?: string
  /** Movie title to search for. */
  t?: string
  /** Type of result to return. */
  type?: OmdbResultType
  /** Year of release */
  y?: number
  /** Return short or full plot. */
  plot?: OmdbPlotType = 'short'

  /** The data type to return. */
  r?: 'json' | 'xml' = 'json'
}

export class OmdbSearchManyDto {
  /**	Movie title to search for. */
  s?: string
  /** Type of result to return. */
  type?: OmdbResultType
  /** Year of release */
  y?: number
  /** Page number to return. */
  page?: number = 1

  /** The data type to return. */
  r?: 'json' | 'xml' = 'json'
}
