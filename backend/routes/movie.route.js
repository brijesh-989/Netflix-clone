import express from "express";
import {
  GetMovieByCategory,
  GetMovieDetail,
  GetMovieTrailers,
  GetSimilarMovies,
  GetTrendingMovie,
} from "../controller/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/trending", GetTrendingMovie);
movieRouter.get("/:id/trailers", GetMovieTrailers);
movieRouter.get("/:id/details", GetMovieDetail);
movieRouter.get("/:id/similar", GetSimilarMovies);
movieRouter.get("/:category", GetMovieByCategory);

export default movieRouter;
