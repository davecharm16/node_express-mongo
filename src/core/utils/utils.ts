import { User } from "../../models/user/schema/user_model.js";
import { ITask } from "../../models/task/interface/task_interface.js";
import { CustomError, IError } from "../extensions/extensions.js";
import { IJwtData } from "../interfaces/interfaces.js";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function verifyToken(token: string): IJwtData | null {
  try{
    const secretKey = process.env.JWT_KEY!;
    if (!token) {
      return null;
    }
    const decoded = jwt.verify(token, secretKey) as { _id: string };
    return {
      _id : decoded._id,
      token : token
    }
  } catch (err) {
    return null;
  }
}

export async function validateTask (task: ITask | any): Promise<boolean | void>{
  const errors : IError[] = [];
  try{
    if(!task.author){
      errors.push({error : 'Task Author is Required'});
    }
    await User.findOne({_id: task?.author});
  }
  catch(e){
    errors.push({error: 'Task Author not Found'});
  }

  try{
    if(task.assigned_to)
      for (const {user} of task?.assigned_to) {
        await User.findById(user);
      }
    else{
      errors.push({error: 'No Assigned Field'});
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

export async function validateUpdateTask(task: ITask | any): Promise<boolean | void>{
  const errors : IError[] = [];
  try{
    if(task.assigned_to)
      for (const {user} of task?.assigned_to) {
        await User.findById(user);
      }
    else{
      errors.push({error: 'No Assigned Field'});
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
