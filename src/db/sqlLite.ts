import "reflect-metadata";
import { createConnection, ConnectionOptions, getConnection, getConnectionManager } from "typeorm";

import * as path from 'path';
import { SampleModel } from "./dbModels/sampleModels";

export class SQLiteDbManager {

    public static getDbClient = () => {
        const connectionManager = getConnectionManager();
        return connectionManager.get('fhSQLLiteConnection')
    }

    public static connect = async () => {
        let options: ConnectionOptions = {
            name: 'fhSQLLiteConnection',
            type: "sqlite",
            database: path.join('data', 'fh-db.db'),
            entities: [SampleModel],
            logging: true,
            synchronize: true
        }
        const connectionManager = getConnectionManager();
        var connection = connectionManager.create(options);
        connection.connect();



    }


}   