import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (name, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
