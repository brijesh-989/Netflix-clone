import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVar.js";
export const generateTokenAndSession = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 20 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV != "development",
  });
  return token;
};
