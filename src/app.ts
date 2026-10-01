import express from 'express';
import {ApiRouter} from "./routes/ApiRouter";



export const app = express();
app.use(express.json());

const apiRouter = new ApiRouter();
app.use("/api", apiRouter.getRouter());