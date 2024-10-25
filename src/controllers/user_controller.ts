import { Request, Response} from "express";
import dotenv from 'dotenv';
import { User } from "../models/user/schema/user_model.js";

dotenv.config();


export const getUsersController =  async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch(e){
    res.statusCode = 500;
    res.json(e);
  }
};

export const getUserController =  async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.json(id);
  }
  catch(e){
    res.statusCode = 500;
    res.json(e);
  }
};


