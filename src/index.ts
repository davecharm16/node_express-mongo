import express, { Express } from "express";
import connectToDB from "./db/dbconfig.js";
import dotenv from 'dotenv';
import { authRoutes } from "./routes/auth_routes.js";
import cors from 'cors';
import { userRoutes } from "./routes/user_routes.js";

dotenv.config();

const app:Express = express();
const PORT:string = process.env.PORT || '8000';
const MONGO_URL:string = process.env.MONGODB_URL || '';
app.use(cors());  
app.use(express.json());

//authentication routes
app.use('/api/auth', authRoutes);
//user routes
app.use('/api/users', userRoutes);


connectToDB(MONGO_URL).then((db) => {
  console.log(`Connected to ${db?.connection.host}`);
  app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
  });
}).catch((e)=>{
  console.log('Error', e);
});

