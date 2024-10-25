import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  tokens : Array<{ token: string }>;
  generateAuthToken(): Promise<string>; 
  createdAt: Date;
}
export interface IUserModel extends mongoose.Model<IUser> {
  findByCredentials(email:string, password: string): Promise<IUser>;
}
export interface IToken{
  token: string
}