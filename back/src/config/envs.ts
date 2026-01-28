import "dotenv/config";

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const DB_TYPE = "postgres";

export const DB_HOST: string | undefined = process.env.DB_host
  ? process.env.DB_host
  : "localhost";

export const DB_PORT: number = process.env.DB_port
  ? parseInt(process.env.DB_port, 10)
  : 5432;

export const DB_USER: string | undefined = process.env.DB_username;

export const DB_PASSWORD: string | undefined = process.env.DB_password;

export const DB_NAME: string | undefined = process.env.DB_database;

export const DB_SYNC: boolean = process.env.DB_synchronize
  ? process.env.DB_synchronize === "true"
  : true;

export const DB_DROP: boolean = process.env.DB_dropSchema
  ? process.env.DB_dropSchema === "true"
  : true;

export const DB_LOGGING: boolean = process.env.DB_logging
  ? process.env.DB_logging === "true"
  : true;
