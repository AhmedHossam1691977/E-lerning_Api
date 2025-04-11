import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import Stripe from 'stripe';

import connectionDB from "./DataBase/DBconnection.js";
import bootstrap from "./src/modules/index.routes.js";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";
import { onlineCorsss } from './src/modules/cours/cours.controller.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.post('/webhook', bodyParser.raw({ type: 'application/json' }), onlineCorsss);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


bootstrap(app);
connectionDB();

app.get('', (req, res) => {
  res.send('Hello World!');
});


app.use(globalError);
app.use('*', (req, res, next) => {
  next(new AppError(`not found endpoint ${req.originalUrl}`, 404));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('uncaughtException', err => console.log("Uncaught Exception Catched!", err));
process.on('unhandledRejection', err => console.log(err));
