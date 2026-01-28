import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

const inicioServer = async () => {
  try {
    await AppDataSource.initialize();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing data source", error);
  }
};

inicioServer();
