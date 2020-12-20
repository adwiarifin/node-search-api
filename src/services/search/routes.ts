import { error } from "console";
import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string);
        res.status(200).send(result);
      },
    ],
  },
];
