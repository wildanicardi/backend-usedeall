import Response from "../helpers/response";
import bcrypt from "bcrypt";
import { userModel } from "../models/user";
import { StatusCodes } from "http-status-codes";
import  userValidation from "../validation/user";

require("dotenv").config();

async function store(req, res) {
  const response = new Response();
  const {firstName,lastName,email,username,password} = req.body;
  const { error } = await userValidation.storeValidation({firstName,lastName,email,username,password});
  if (error) {
    response.setMessage(error.details[0].message);
    response.setStatus(false);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  const emailExist = await userModel.findOne({ email});
  if (emailExist) {
    response.setMessage("Email already exist");
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      role: "User",
      password: hashPassword,
    });
    let { password, __v, ...user } = newUser.toObject();
    response.setMessage("Create User Success");
    response.setData(user);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function list(req, res) {
  const response = new Response();
  const { role } = req.query;
  let user;
  if (role) {
    user = await userModel
      .find({ role: role })
      .sort({ _id: -1 })
      .select(["-password","-__v"]);
  } else {
    user = await userModel
      .find()
      .sort({ _id: -1 })
      .select(["-password","-__v"]);
  }
  response.setMessage("Get All User");
  response.setData(user);
  return res.status(StatusCodes.OK).json(response);
}

async function update(req, res) {
  const response = new Response();
  const { userId } = req.params;
  try {
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    response.setMessage("Update Success");
    response.setData(userUpdate);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function show(req, res) {
  const response = new Response();
  const { userId } = req.params;
  const userData = await userModel.find({ _id: userId }).select(["-password","-__v"]);
  response.setMessage("Detail User");
  response.setData(userData);
  return res.status(StatusCodes.OK).json(response);
}

async function destroy(req, res) {
  const response = new Response();
  const { userId } = req.params;
  try {
    const userRemove = await userModel.remove({ _id: userId });
    response.setMessage("Delete User Success");
    response.setData(userRemove.deletedCount);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    response.setMessage(error.message);
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}
export default {
  store,
  list,
  update,
  show,
  destroy,
};
