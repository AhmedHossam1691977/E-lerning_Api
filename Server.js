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

// ✅ لازم ييجي قبل أي parser
app.post('/webhook', express.raw({ type: 'application/json' }), onlineCorsss);

// ✅ بعد كده parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// باقي الإعدادات
bootstrap(app);
connectionDB();

app.get('', (req, res) => {
  res.send('Hello World!');
});

// Error handling
app.use(globalError);
app.use('*', (req, res, next) => {
  next(new AppError(`not found endpoint ${req.originalUrl}`, 404));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Global error handlers
process.on('uncaughtException', err => console.log("Uncaught Exception Catched!", err));
process.on('unhandledRejection', err => console.log(err));
