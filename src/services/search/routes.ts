import { Request, Response } from "express";
import { getPlacesByName, putPhotos, getSample } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q.toString());
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/putSample",
    method: "get",
    handler: [

      async ({ query }: Request, res: Response) => {
        const result = await putPhotos();
        res.status(200).send(result);
      }
    ]
  },

  {
    path: "/api/v1/getAllSamples",
    method: "get",
    handler: [

      async ({ query }: Request, res: Response) => {
        const result = await getSample();
        res.status(200).send(result);
      }
    ]
  }
];
