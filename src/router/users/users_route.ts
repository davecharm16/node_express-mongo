import express, { Router, Request, Response} from "express";
import dotenv from 'dotenv';
import { User } from "../../models/user/schema/user_model.js";

dotenv.config();

const router: Router = express.Router();

router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch(e){
    res.statusCode = 500;
    res.json(e);
  }
});

router.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.json(id);
  }
  catch(e){
    res.statusCode = 500;
    res.json(e);
  }
});

router.post("/api/user", async (req: Request, res: Response) => {
  try {
    const user = await new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({user, token})
  }
  catch(e){
    res.status(500).json(e);
  }
});


export { router as userRouter };
