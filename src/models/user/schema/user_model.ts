import  mongoose, { Schema } from "mongoose";
import  bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { IUser } from "../interface/user_interface";
import { CustomError } from "../../../core/extensions/extensions";
import { error } from "console";

const userSchema = new Schema<IUser>({
  first_name : {
    type: String,
    required: true,
    trim: true,
    createdAt : Date,
  },
  last_name : {
    type: String,
    required: true,
    trim: true,
    createdAt : Date,
  },
  username : {
    type: String,
    required: true,
    validate: (value: string)=>{
      if(!validator.isLength(value, {min: 4})){
        throw new CustomError({error: 'username must be 4 or more character'});
      }
    },
    createdAt : Date,
  },
  email :  {
    type: String,
    required : true,
    unique : true,
    lowercase: true,
    validate : (value:string) => {
      if(!validator.isEmail(value)){
        throw new CustomError({error : 'Invalid Email Address'});
      }
    }
  }, 
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
          type: String,
          required: true
      }
    }
  ]
});


userSchema.pre('save', async function (next) {
  const user:IUser = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  } 
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user:IUser = this as IUser;
  const key =  process.env.JWT_KEY;
  if(key){
    const token = jwt.sign({_id : user._id}, key);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
  }
  else{
    throw new CustomError({ error: 'No JWT token' });
  }
}


userSchema.statics.findByCredentials = async function (email, password){
  const user: IUser | null  = await User.findOne({email});
  const error = new CustomError({error: 'Invalid Login Credentials'});

  if(!user){
    throw error;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if(!isPasswordMatch) {
    throw error;
  }

  return user;
} 


const User = mongoose.model('User', userSchema);

export default User;