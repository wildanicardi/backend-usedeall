import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import route
import routerIndex from "./routes/index.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";

const app = express();
app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
// set route
app.use("/", routerIndex);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

export default app;
