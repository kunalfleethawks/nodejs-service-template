import { SQLiteDbManager } from "../../../db/sqlLite"
import { SampleModel } from "../../../db/dbModels/sampleModels";


export class SampleRepository {

    public static getAllPhotos = async () => {
        let client = await SQLiteDbManager.getDbClient();
        let photo = await client.getRepository(SampleModel);
        return await photo.find();

    }

    public static putPhotos = async (model: SampleModel) => {
        let client = await SQLiteDbManager.getDbClient();
        let photo = await client.getRepository(SampleModel);
        return await photo.save(model);

    }

    public static deletePhotos = async (id: string) => {
        let client = await SQLiteDbManager.getDbClient();
        let photo = await client.getRepository(SampleModel);
        return await photo.delete(id);

    }

}