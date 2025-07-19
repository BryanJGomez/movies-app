import { movieApi } from "@/core/api/movie-api";
import { MovieDBCreditsResponse } from "@/infrastructure/interfaces/moviedb-credits.response";
import { CastMapper } from "@/infrastructure/mappers/cast.mapper";

export const getMovieCastAction = async (movieId: number) => {
  try {
    const { data } = await movieApi.get<MovieDBCreditsResponse>(
      `/${movieId}/credits`
    );
    const response = data.cast.map(CastMapper.fromMovieDBCastToEntity);
    return response;
  } catch (error) {
    console.log(`Error fetching cast for movie ID ${movieId}:`, error);
    throw "Cant load cast by id";
  }
};
