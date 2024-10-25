import { User } from "../../models/user/schema/user_model.js";
import { ITask } from "../../models/task/interface/task_interface.js";
import { CustomError, IError } from "../extensions/extensions.js";
import { IJwtData } from "../interfaces/interfaces.js";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

export function verifyToken(token: string): IJwtData | null {
  const secretKey = process.env.JWT_KEY as string;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded === 'string') {
      return null;
    }
    if ((decoded as JwtPayload)._id && (decoded as JwtPayload).token) {
      return decoded as IJwtData;
    }
    return null;
  } catch (err) {
    throw new CustomError({ error: 'invalid token' });
  }
}

export async function validateTask (task: ITask | any): Promise<boolean | void>{
  const errors : IError[] = [];
  try{
    const userAuthor = await User.findOne({_id: task?.author});
  }
  catch(e){
    errors.push({error: 'User Error'});
  }

  try{
    if(task.assigned_to)
      for (const {user} of task?.assigned_to) {
        await User.findById(user);
      }
    else{
      throw errors.push({error: 'No Assigned Field'});
    }
  }
  catch(e){
    errors.push({ error: `Assigned User not found` });
  }

  if(errors.length > 0){
    throw new CustomError({error: errors});
  }
  
  return true;
}
