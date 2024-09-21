import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVar.js";
import { User } from "../models/user.model.js";
export async function ProtectRoute(req, res, next) {
  try {
    const token = req.cookies["jwt-netflix"];
    
    if (!token) {
      res.status(401).json({ success: false, message: "TOken not provided" });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ success: false, message: "unauthorized access" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      res.status(404).json({ success: false, message: "user not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}
