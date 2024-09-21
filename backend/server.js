import express from "express";
import router from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVar.js";
import { connectDB } from "./config/db.js";
import movieRouter from "./routes/movie.route.js";
import cookieParser from "cookie-parser";
import { ProtectRoute } from "./middleware/protectRoute.js";
import searchRoute from "./routes/search.route.js";
const app = express();

app.use(express.json()); // for body parser
app.use(cookieParser());

app.use("/api/v1/auth", router);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/search", ProtectRoute, searchRoute);

app.listen(ENV_VARS.PORT, () => {
  connectDB();
});
