import jwt from "jsonwebtoken";
import Response from "../helpers/response";
import { userModel } from "../models/user";
import {  StatusCodes} from 'http-status-codes';
require("dotenv").config();

async function auth(req,res,next){
  const response = new Response();
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    response.setMessage("Acces Denied");
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  try {
    const verified = jwt.verify(token, process.env.jwt_key);
    req.user = verified;
    next();
  } catch (error) {
    response.setMessage("Invalid Token");
    response.setStatus("False");
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

async function isAdmin(req,res,next) {
  const {userId} = req.user;
  const response = new Response();
  const user = await userModel.findById(userId);
  if(user.role == "Admin"){
    next();
    return;
  }
  response.setMessage("Require Admin Role!");
  response.setStatus("False");
  return res.status(StatusCodes.BAD_REQUEST).json(response);
}


export default {
  auth,
  isAdmin
}