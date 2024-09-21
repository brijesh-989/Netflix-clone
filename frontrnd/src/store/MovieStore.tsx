import { create } from "zustand";
type Movie = {};
type MovieStore = {
  movies: {
    trendingMovies: Movie[];
    movieTrailerById: Movie[];
  };
  trendingMovie: () => Promise<void>;
  MovieTrailer: (id: number) => Promise<void>;
};
export const useStore = create<MovieStore>()((set) => ({
  movies: {
    trendingMovies: [],
    movieTrailerById: [],
  },
  trendingMovie: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/movie/trending"
      );
      const data = await response.json();
      set((state) => ({
        movies: { ...state.movies, trendingMovies: data.content },
      }));
    } catch (error) {
      console.log(error);
    }
  },
  MovieTrailer: async (id: number) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:8080/api/v1/movie/${id}/trailers`
      );
      const data = await response.json();
      set((state) => ({
        movies: { ...state.movies, movieTrailerById: data.trailers },
      }));
    } catch (error) {
      console.log(error, "je");
    }
  },
}));
