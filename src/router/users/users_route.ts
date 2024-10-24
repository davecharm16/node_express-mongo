import express, { Router, Request, Response} from "express";
import dotenv from 'dotenv';
import { User } from "../../models/user/schema/user_model.js";

dotenv.config();

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch(e){
    res.statusCode = 500;
    res.json(e);
  }
});

export { router as userRouter };
