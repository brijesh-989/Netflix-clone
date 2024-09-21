import { User } from "../models/user.model.js";
import brcypt from "bcryptjs";
import { generateTokenAndSession } from "../utils/generateTokenAndSession.js";

export async function signup(req, res) {
  try {
    var { email, password, userName } = req.body;
    console.log(req.body);
    if (!email || !password || !userName) {
      res
        .status(500)
        .json({ success: false, message: "All fields are required" });
    }
    if (password.length < 8) {
      res.status(500).json({
        success: false,
        message: "Password must 8 be characters long",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(500).json({ success: false, message: "email is not valid" });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      res.status(500).json({ success: false, message: "Email already exists" });
    }

    const existingUserByUserName = await User.findOne({ userName: userName });
    if (existingUserByUserName) {
      res
        .status(500)
        .json({ success: false, message: "User Name is already Exists" });
    }

    const profilePic = [
      "/icons/1.png",
      "/icons/2.jpeg",
      "/icons/3.jpeg",
      "/icons/4.jpeg",
    ];
    const image = profilePic[Math.floor(Math.random() * profilePic.length)];

    const salt = brcypt.genSaltSync(10);
    password = brcypt.hashSync(password, salt);

    const userData = new User({
      userName,
      email,
      password,
      image,
    });

    console.log(userData);
    if (userData) {
      generateTokenAndSession(userData._id, res);
      await userData.save();
      res.status(201).json({
        success: true,
        user: {
          ...userData._doc,
          password: "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentails" });
    }
    const isPassCorrect = await brcypt.compare(password, user.password);
    if (isPassCorrect) {
      generateTokenAndSession(user._id, res);
      res.status(200).json({
        success: true,
        user: {
          ...user._doc,
          password: "",
        },
      });
    }
  } catch (error) {}
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(201).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
