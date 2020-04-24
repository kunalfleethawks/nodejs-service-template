import { getPlaces } from "./providers/OpenCageDataProvider";
import { SampleModel } from "../../db/dbModels/sampleModels";
import { SampleRepository } from "./providers/sampleRespository";

/**
 * @swagger
 *
 * /getPlacesbyName/{placeName}:
 *   get:
 *     description: Get Places by name
 *     parameters:
 *       - name: placeName
 *         in: path
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get Places by name
 *       400:
 *         description: Bad request
 *     tags: [search]
 */
export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: []
    };
  }

  return await getPlaces(q);
};

export const putPhotos = async () => {
  var sampleModel: SampleModel = {
    name: 'sample'
  };
  return await SampleRepository.putPhotos(sampleModel);


};

export const getSample = async () => {
  var sampleModel: SampleModel = {
    name: 'sample'
  };
  return await SampleRepository.getAllPhotos();


};
