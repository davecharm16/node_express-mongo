import { validateTask } from '../core/utils/utils.js';
import { Request, Response, } from 'express';
import { Task } from '../models/task/schema/task_schema.js';
export const getAllTaskController = (req: Request, res: Response)  => {
  try{
    
  }
  catch(e){

  }
}
export const getTaskByIdController = (req: Request, res: Response) => {
  
}
export const createTaskController = async (req: Request, res: Response) => {
  try{
    const taskRequest = req.body;
    const validated = await validateTask(taskRequest);
    if(validated){
      const task = new Task(taskRequest);
      await task.save();
      res.status(201).json({task});
    }
  }
  catch(e){
    res.status(500).json(e);
  }
}
export const updateTaskController = (req: Request, res: Response) => {
  
}
export const deleteTaskController = (req: Request, res: Response) => {
  
}