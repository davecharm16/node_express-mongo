import { Document } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  tokens : IToken[],
  createdAt: Date;
}


export interface IToken{
  token: string
}