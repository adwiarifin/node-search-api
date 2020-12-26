import redis from "redis";
import dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config();

const { CACHE_CONNECTION = "redis://localhost:6379" } = process.env;

const redisClient = redis.createClient({
  url: CACHE_CONNECTION,
});

const init = async () =>
  new Promise((resolve, reject) => {
    redisClient.on("connect", () => {
      logger.info({
        message: "Redis client connected",
      });
      resolve(redisClient);
    });

    redisClient.on("error", (error) => {
      reject(error);
    });
  });

export { init, redisClient };
