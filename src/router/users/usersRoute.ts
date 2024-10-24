import express, { Router, Request, Response} from "express";
import dotenv from 'dotenv';
dotenv.config();

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

export { router as userRouter };
