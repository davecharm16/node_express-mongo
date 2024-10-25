import { CustomError } from "../extensions/extensions.js";
import { IJwtData } from "../interfaces/interfaces.js";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

export function verifyToken(token: string): IJwtData | null {
  console.log(token);
  const secretKey = process.env.JWT_KEY as string;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded === 'string') {
      return null;
    }
    if ((decoded as JwtPayload)._id && (decoded as JwtPayload).token) {
      return decoded as IJwtData;
    }
    return null;
  } catch (err) {
    throw new CustomError({ error: 'invalid token' });
  }
}