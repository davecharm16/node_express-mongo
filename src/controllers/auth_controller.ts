import { Request, Response } from 'express';
import { IUser } from '../models/user/interface/user_interface.js';
import { User } from '../models/user/schema/user_model.js';
import { CustomError } from '../core/extensions/extensions.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenRequest } from '../core/interfaces/interfaces.js';
dotenv.config();


export const loginInController =  async(req : Request, res : Response) =>{
  try {
    const {email , password} = req.body;
    const user:IUser = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({user, token});
  }
  catch(e){
    res.status(500).json(e);
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const isExisting: IUser | null = await User.findOne({email: req.body.email});
    if(isExisting)
      throw new CustomError({error : 'The Email is already taken'});
    else {
      const user = await new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({user, token})
    }
  }
  catch(e){
    res.status(500).json(e);
  }
};

export const logOutController = async (req: Request & TokenRequest, res: Response): Promise<void> => {
  try {
    req.user.tokens = req.user.tokens.filter((token: { token: string; }) => {
        return token.token != req.token
    })
    await req.user.save()
    res.json({message: 'Logged Out Successfully'})
  } catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
};

export const logOutAll = async (req: Request & TokenRequest, res: Response): Promise<void> => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.json({message: 'Logged out on all session'})
  } catch (e) {
      res.status(500).json({error : e})
  }
};