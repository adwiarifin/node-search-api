import { Client } from "pg";
import { logger } from "./logger";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_CONNECTION } = process.env;

const dbClient = new Client({
  connectionString: DATABASE_CONNECTION,
});

dbClient.on("error", (err: Error) => {
  logger.info({
    message: "Postgres client: Unexpected error on idle client",
    extra: err,
  });

  process.exit(1);
});

const init = async () => {
  await dbClient.connect();
  logger.info({
    message: "Postgres client connected",
  });
};

export { init, dbClient };
