import express, { Express, json } from "express";
import connectToDB from "./db/dbconfig.js";
import { userRouter } from "./router/users/users_route.js";
import dotenv from 'dotenv';
import { AuthRouter } from "./router/auth/auth_route.js";
dotenv.config();

const app:Express = express();
const PORT:string = process.env.PORT || '8000';
const MONGO_URL:string = process.env.MONGODB_URL || '';

app.use(json());

//user router
app.use(userRouter);

//
app.use(AuthRouter);

connectToDB(MONGO_URL).then((db) => {
  console.log(`Connected to ${db?.connection.host}`);
  app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
  });
}).catch((e)=>{
  console.log('Error', e);
});
