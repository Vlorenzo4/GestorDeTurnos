import { error } from "node:console";
import { AppDataSource } from "../config/data-source";
import {
  IUserLoginDTO,
  IUserRegisterDTO,
  IUserRegisterResponse,
} from "../DTO/User.DTO";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { UserModel } from "../repositories/User.repository";
import {
  checkCredentials,
  createCredentialService,
} from "./Credential.service";

export const getUserService = async (): Promise<User[]> => {
  return await UserModel.find();
};

export const getUserByIdService = async (id: number): Promise<User> => {
  if (!id)
    throw new Error("El userid no fue recibido, no es posible crear un turno");
  const userFound: User | null = await UserModel.findOne({
    where: {
      id,
    },
    relations: ["appointments"],
  });

  if (!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`);
  return userFound;
};

export const registerUserService = async (
  user: IUserRegisterDTO,
): Promise<IUserRegisterResponse> => {
  const transactionResult = await AppDataSource.transaction(
    async (entityManager) => {
      const credentialCreated: Credential = await createCredentialService(
        entityManager,
        user.username,
        user.password,
      );
      const newUser: User = await entityManager.create(User, {
        birthdate: new Date(user.birthdate),
        email: user.email,
        name: user.name,
        nDni: user.nDni,
        credential: credentialCreated,
      });
      await entityManager.save(newUser);
      return newUser;
    },
  );
  return transactionResult;
};

export const loginUserService = async (user: IUserLoginDTO) => {
  const credentialId: number = await checkCredentials(
    user.username,
    user.password,
  );

  const userFound: User | null = await UserModel.findOne({
    where: {
      credential: {
        id: credentialId,
      },
    },
  });

  return {
    id: userFound?.id,
    name: userFound?.name,
    email: userFound?.email,
    birthdate: userFound?.birthdate,
    nDni: userFound?.nDni,
  };
};
