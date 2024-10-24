import express, { Router, Request, Response } from 'express';
import { IUser } from '../../models/user/interface/user_interface.js';
import { User } from '../../models/user/schema/user_model.js';

const router : Router = express.Router();

router.post('/api/login', async(req : Request, res : Response)=>{
  try {
    const {email , password} = req.body;
    const user:IUser = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({user, token});
  }
  catch(e){
    res.status(500).json(e);
  }
});



export { router as AuthRouter }