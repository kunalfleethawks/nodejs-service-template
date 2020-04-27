import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [

      async ({ query }: Request, res: Response) => {
        throw new Error("This is an error and it should be logged to the console");
        res.status(200).send('hello');
      }
    ]
  }
];
