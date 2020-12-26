import { redisClient } from "../../config/cache";
import { publish } from "../../config/messenger";
import { getPlaces } from "./providers/OpenCageDataProvider";

export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: [],
    };
  }

  const result = await getPlaces(q);
  publish(result);
  const key = 'search-' + q;
  redisClient.setex(key, 3600, JSON.stringify(result));

  return result;
};
