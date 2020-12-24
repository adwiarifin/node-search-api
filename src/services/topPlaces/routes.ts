import { NextFunction, Request, Response } from "express";
import { getTopPlaces } from "./TopPlacesController";
import { getFromCache } from "../../middleware/caching";
import { HTTP400Error } from "../../utils/httpErrors";

const checkParams = (req: Request, _res: Response, next: NextFunction) => {
  const { offset, limit } = req.query;
  if (!offset || !limit) {
    throw new HTTP400Error("Missing parameters: offset/limit");
  } else {
    next();
  }
};

export default [
  {
    path: "/api/v1/topPlaces",
    method: "get",
    handler: [
      checkParams,
      (req: Request, res: Response, next: NextFunction) => {
        const { offset = 0, limit = 0 } = req.query;
        const key = `topPlaces-${offset}-${limit}`;
        getFromCache(key, res, next);
      },
      async ({ query }: Request, res: Response) => {
        const { offset = 0, limit = 0 } = query;
        const result = await getTopPlaces(+offset, +limit);
        res.status(200).send(result);
      },
    ],
  },
];
