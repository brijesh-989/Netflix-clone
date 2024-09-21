import express from "express";
import { searchMovie, searchPerson } from "../controller/search.controller.js";

const searchRoute = express.Router();

searchRoute.get("/person/:person_name", searchPerson);
searchRoute.get("/movie/:movie_name", searchMovie);

export default searchRoute;
