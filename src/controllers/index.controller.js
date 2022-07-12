import Response from "../helpers/response";
import {  StatusCodes} from 'http-status-codes';
export default {
  index: (req, res) => {
    const response = new Response();
    response.setMessage("Welcome to RESTfull with Express");
    res.status(StatusCodes.OK).json(response);
  }
};
