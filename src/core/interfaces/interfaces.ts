import { Request } from "express";
export interface IJwtData {
  _id : string,
  token: string,
}

export interface TokenRequest{
  user?: any; 
  token? : any
}