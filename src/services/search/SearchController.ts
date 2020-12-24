import { redisClient } from "../../config/cache";
import { getPlaces } from "./providers/OpenCageDataProvider";

export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: [],
    };
  }

  const result = await getPlaces(q);
  redisClient.setex(q, 3600, JSON.stringify(result));

  return result;
};
