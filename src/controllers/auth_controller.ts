import { Request, Response } from 'express';
import { IUser } from '../models/user/interface/user_interface.js';
import { User } from '../models/user/schema/user_model.js';
import { CustomError } from '../core/extensions/extensions.js';


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
