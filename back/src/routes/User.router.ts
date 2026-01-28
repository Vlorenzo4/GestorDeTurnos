import { Request, Response, Router } from "express";
import {
  getUserById,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/User.controller";
import { IUserLoginDTO, IUserRegisterDTO } from "../DTO/User.DTO";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) => getUsers(req, res));

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUserById(req, res)
);

userRouter.post(
  "/register",
  (req: Request<unknown, unknown, IUserRegisterDTO>, res: Response) =>
    registerUser(req, res)
);

userRouter.post(
  "/login",
  (req: Request<unknown, unknown, IUserLoginDTO>, res: Response) =>
    loginUser(req, res)
);

export default userRouter;
