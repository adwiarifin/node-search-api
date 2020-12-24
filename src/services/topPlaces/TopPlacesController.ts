import { redisClient } from "../../config/cache";
import { getPlaces } from "./TopPlacesModel";

export const getTopPlaces = async (offset: number, limit: number) => {
  const result = await getPlaces(offset, limit);
  const key = `topPlaces-${offset}-${limit}`;
  redisClient.setex(key, 3600, JSON.stringify(result));
  return result;
};
