import { validateTask, validateUpdateTask } from '../core/utils/utils.js';
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
export const getTaskByAssignedUserIdController = async (req: Request, res: Response) => {
  try{
    const userId = req.params?.id;
    const tasks = await Task.find({
      'assigned_to.user': new Types.ObjectId(userId),
    })
    .populate({path: 'author', select : '-password -email -tokens -createdAt'})
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
    .populate({path: 'author', select : '-password -email -tokens -createdAt'})
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

export const updateTaskController = async (req: Request, res: Response) => {
  try{
    const taskId = req.params.id;
    const userId = req.body.userId;

    if (!Types.ObjectId.isValid(taskId) || !Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: 'Invalid task or user ID format' });
    }
    else{
      const { userId: _, ...updates } = req.body;
      const validate = await validateUpdateTask(updates);
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id : taskId,
          $or : [
            {'assigned_to.user': new Types.ObjectId(userId)},
            {'author': new Types.ObjectId(userId)},
          ]
        },
        { $set: updates },       
        { new: true, runValidators: true }
      )
      .populate({path: 'author', select : '-password -email -tokens -createdAt'})
      .populate({path: 'assigned_to.user', select : '-password -email -tokens -createdAt'});
      ;
      
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
      }
      else{
        res.status(200).json(updatedTask);
      }
    }
  }
  catch(e){
    res.status(400).json(e);
  }
}

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const taskId = req.params?.id;
    const userId = req.body.userId;
    const task = await Task.findOneAndDelete({_id : taskId, author : userId});
    if(!task){
       res.status(400).json({error: 'Cannot Delete this'});
    }else{
      res.status(200).json({message: 'Task Deleted Successfully'});
    }
  }
  catch(e){
    res.status(500).json(e);
  }

}