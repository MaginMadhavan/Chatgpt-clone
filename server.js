import express from "express";
import colors from "colors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

//dotenv
dotenv.config();

//rest Object
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
