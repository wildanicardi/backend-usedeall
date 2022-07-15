import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import Response from "../helpers/response";
import { userModel } from "../models/user";
import { StatusCodes } from "http-status-codes";
import authValidation from "../validation/auth";

require("dotenv").config();

async function register(req, res) {
  const response = new Response();
  const { firstName, lastName, email, username, password } = req.body;
  const { error } = await authValidation.registerValidation({
    firstName,
    lastName,
    email,
    username,
    password,
  });
  if (error) {
    response.setMessage(error.details[0].message);
    response.setStatus(false);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  const emailExist = await userModel.findOne({ email });

  if (emailExist) {
    response.setMessage("Email already exist");
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  const usernameExist = await userModel.findOne({ username });
  if (usernameExist) {
    response.setMessage("Username already exist");
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      role: "Admin",
      password: hashPassword,
    });
    let { password, __v, ...user } = newUser.toObject();
    response.setMessage("Register Success");
    response.setData(user);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function login(req, res) {
  let user;
  const response = new Response();
  const { username, password } = req.body;
  const { error } = await authValidation.loginValidation({ username, password });
  if (error) {
    response.setMessage(error.details[0].message);
    response.setStatus(false);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  user = await userModel.findOne({ username });
  if (!user) {
    response.setMessage("Username Not Found");
    response.setStatus("False");
    return res.status(StatusCodes.UNAUTHORIZED).json(response);
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    response.setMessage("Wrong Password");
    response.setStatus("False");
    return res.status(StatusCodes.UNAUTHORIZED).json(response);
  }
  try {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.jwt_key,
      {
        expiresIn: "1d",
      }
    );
    response.setMessage("Login Success");
    response.setData(token);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function profile(req, res) {
  const { userId } = req.user;
  const response = new Response();
  try {
    const user = await userModel.findById(userId).select(["-password","-__v"]);
    response.setMessage("Profile User");
    response.setData(user);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function updateProfile(req, res) {
  const response = new Response();
  const { user } = req;
  try {
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: user.userId },
      { ...req.body },
      { new: true }
    );
    response.setMessage("Update Profile Success");
    response.setData(userUpdate);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}
export default {
  register,
  login,
  profile,
  updateProfile,
};
