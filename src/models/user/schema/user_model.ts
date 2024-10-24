import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { IUser } from "../interface/user_interface";
import { CustomError } from "../../../core/extensions/extensions.js";


const userSchema = new Schema<IUser>({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isLength(value, { min: 4 }),
      message: 'Username must be at least 4 characters long',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid Email Address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,  
  },
});


userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this as IUser;
  const key = process.env.JWT_KEY;

  if (key) {
    const token = jwt.sign({ _id: user._id }, key);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } else {
    throw new CustomError({ error: 'JWT secret key not found' });
  }
};

userSchema.statics.findByCredentials = async function (email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new CustomError({ error: 'Invalid Login Credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError({ error: 'Invalid Login Credentials' });
  }

  return user;
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel as User }