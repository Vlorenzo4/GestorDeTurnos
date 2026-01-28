import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials.entity";

export const CredentialModel = AppDataSource.getRepository(Credential);
