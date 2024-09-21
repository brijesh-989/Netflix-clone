import { fetchFromTMDB } from "../movies/TMDB_API.js";

export async function GetTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie = [];
    if (data?.results) {
      for (let i = 0; i < data?.results.length && i < 100; i++) {
        randomMovie.push(data.results[i]);
      }
    }
    return res.json({ success: true, content: randomMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function GetMovieTrailers(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    return res.json({ success: true, trailers: data.results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}
export async function GetMovieDetail(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    return res.json({ success: true, details: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function GetSimilarMovies(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    return res.json({ success: true, similarMovies: data.results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function GetMovieByCategory(req, res) {
  try {
    const { category } = req.params;
    console.log(category);
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US`
    );
    return res.status(200).json({ success: true, message: data.results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}
