import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../core/extensions/extensions.js';
import { User } from '../models/user/schema/user_model.js';
import { IJwtData, TokenRequest } from '../core/interfaces/interfaces.js';
import { verifyToken } from '../core/utils/utils.js';



const authMiddleWare = async(req: Request & TokenRequest, res : Response, next : NextFunction) => {
  try{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(!token)
      throw new CustomError({error: 'Invalid Token or Key'});
    const data:IJwtData | null= verifyToken(token);
    const user  = User.findOne({_id : data?._id, 'tokens.token' : token});
    if(!user){
      throw new CustomError({error: 'Not Authorized to Access this content'});
    }
    req.user = user;
    req.token = token;
    next();
  }
  catch(e){
    console.log(e)
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}


export default authMiddleWare