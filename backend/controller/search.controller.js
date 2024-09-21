import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../movies/TMDB_API.js";

export async function searchPerson(req, res) {
  const { person_name } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${person_name}&include_adult=false&language=en-US`
    );
    const result = response.results;
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: result[0].id,
          image: result[0].profile_path,
          title: result[0].name,
          searchType: "person",
          cratedAt: new Date(),
        },
      },
    });

    return res.status(201).json({ success: true, message: result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function searchMovie(req, res) {
  const { movie_name } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${movie_name}&include_adult=false&language=en-US`
    );
    const result = response.results;
    return res.status(201).json({ success: true, message: result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
