import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { CredentialModel } from "../repositories/Credentials.repository";

const crypPass = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const checkUsernameExist = async (username: string) => {
  const credentialFound: Credential | null = await CredentialModel.findOne({
    where: {
      username,
    },
  });

  if (credentialFound)
    throw new Error(
      `El username ${username} ya se encuentra en uso, intente con uno nuevo.`
    );
};

export const createCredentialService = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  await checkUsernameExist(username);

  const newCredential: Credential = entityManager.create(Credential, {
    username,
    password: await crypPass(password),
  });

  await entityManager.save(newCredential);
  return newCredential;
};

export const checkCredentials = async (
  username: string,
  password: string
): Promise<number> => {
  const credentialFound: Credential | null = await CredentialModel.findOne({
    where: {
      username,
    },
  });
  if (credentialFound?.password !== (await crypPass(password)))
    throw new Error("Credenciales incorrectas.");

  return credentialFound.id;
};
