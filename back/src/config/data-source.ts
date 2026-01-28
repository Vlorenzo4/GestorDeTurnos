import { DataSource } from "typeorm";
import {
  DB_DROP,
  DB_HOST,
  DB_LOGGING,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_TYPE,
  DB_USER,
} from "./envs";

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING,
  entities: ["src/entities/**/*.ts"],
  synchronize: DB_SYNC,
  dropSchema: DB_DROP,
});
