import mongoose, { Schema } from "mongoose";
import validator from 'validator';
import { ITask, PriorityLevel, Status } from '../interface/task_interface.js';

const taskSchema = new mongoose.Schema<ITask>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (val: string) =>
        validator.isLength(val, {
          min: 4,
          max: 16,
        }),
      message: 'Name must be 3 - 16 in characters'
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  priority_level: {
    type: String,
    enum: Object.values(PriorityLevel),
    default: PriorityLevel.low,
    required: true,
  },
  task_status: {
    type: String,
    enum: Object.values(Status),
    default: Status.new,
    required: true,
  },
  completed : {
    type: Boolean,
    default : false,
  },
  assigned_to: [
    {
      user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required : true,
      },
    },
  ],
});


const TaskModel = mongoose.model<ITask>('Task', taskSchema);

export { TaskModel as Task };