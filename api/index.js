import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import userInfoRouter from './routes/userInfo.js';
import storeMtrInfoRouter from './routes/mtrinfo.js';
import getDashInfo from './routes/dashinfo.js';
import exportCsv from './routes/exportCsv.js';


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/auth/", authRouter);
app.use("/api/auth/", userInfoRouter);
app.use("/api/", storeMtrInfoRouter);
app.use("/api/", getDashInfo);
app.use("/api/", exportCsv);


app.listen(3001, () => {
  console.log("http://localhost:3001");
});
