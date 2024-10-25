import { IUser } from 'models/user/interface/user_interface';
import  { Document, Types } from 'mongoose';

export enum PriorityLevel {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
}

export enum Status {
  new ='new',
  in_progress = 'in_progress',
  completed = 'completed',
};

export interface ITask extends Document {
  name: string;
  author: Types.ObjectId | IUser;
  description?: string;
  archived: boolean;
  priority_level: PriorityLevel;
  task_status: Status;
  completed : boolean;
  assigned_to: Array<{ user: Types.ObjectId }>;
}