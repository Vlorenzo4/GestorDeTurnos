import { Request, Response } from "express";
import { IUserLoginDTO, IUserRegisterDTO } from "../DTO/User.DTO";
import {
  getUserByIdService,
  getUserService,
  loginUserService,
  registerUserService,
} from "../services/User.service";
import { User } from "../entities/User.entity";
import { PostgresError } from "../interfaces/Error.interface";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getUserService();
    res.status(200).json({
      data: users,
      msg: "Obterner el listado de todos los usuarios",
    });
  } catch (error) {
    res.status(200).json({
      msg:
        error instanceof Error
          ? error.message
          : "Ocurrio un error al obtener los usuarios",
    });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user: User = await getUserByIdService(+req.params.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      msg:
        error instanceof Error
          ? error.message
          : "Ocurrio un error al obtener el usuario",
    });
  }
};

export const registerUser = async (
  req: Request<unknown, unknown, IUserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const userRegister = await registerUserService(req.body);
    res.status(201).json({
      data: userRegister,
      msg: "Registro de un nuevo usuario ",
    });
  } catch (error) {
    const err = error as PostgresError;
    res.status(400).json({
      msg: err.detail
        ? err.detail
        : err instanceof Error
        ? err.message
        : "Ocurrio un error desconocido",
    });
  }
};

export const loginUser = async (
  req: Request<unknown, unknown, IUserLoginDTO>,
  res: Response
) => {
  try {
    res.status(200).json({
      login: true,
      user: await loginUserService(req.body),
    });
  } catch (error) {
    res.status(400).json({
      msg: error instanceof Error ? error.message : "Ocurrio un error",
    });
  }
};
