import { validateTask } from '../core/utils/utils.js';
import { Request, Response, } from 'express';
import { Task } from '../models/task/schema/task_schema.js';
import { Types } from 'mongoose';
export const getAllTaskController = async (req: Request, res: Response)  => {
  try{
    const tasks = await Task.find()
    .populate({path: 'author', select : '-password -email -tokens -createdAt'})
    .populate({path: 'assigned_to.user', select : '-password -email -tokens -createdAt'});
    res.status(200).json(tasks);
  }
  catch(e){
    console.log(e)
    res.status(500).json({error: 'Error getting task'});
  }
}
export const getTaskByUserIdController = async (req: Request, res: Response) => {
  try{
    const userId = req.params?.id;
    const tasks = await Task.find({
      'assigned_to.user': new Types.ObjectId(userId),
    })
    .populate({path: 'assigned_to.user', select : '-password -email -tokens -createdAt'});
    res.status(200).json(tasks);
  }
  catch(e){
    console.log(e)
    res.status(500).json({error: 'Error getting task'});
  }
}

export const getTaskByAuthorIdController = async (req: Request, res: Response) => {
  try{
    const userId = req.params?.id;
    console.log(userId);
    const tasks = await Task.find({
      author: new Types.ObjectId(userId),
    })
    .populate({path: 'assigned_to.user', select : '-password -email -tokens -createdAt'});
    res.status(200).json(tasks);
  }
  catch(e){
    console.log(e)
    res.status(500).json({error: 'Error getting task'});
  }
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