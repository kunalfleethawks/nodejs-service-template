import * as AWS from 'aws-sdk';

export class DbManager {
    public static PrintHello(message: string) {
        return message + ' Got from function';
    }
  

    public static getDynamoDbClient():AWS.DynamoDB.DocumentClient {
        let options = {};
        if (process.env.IS_OFFLINE) {
            console.log('OFFLINE')
            options = {
              region: 'localhost',
              endpoint: 'http://localhost:8000',
            };
          }
          return new AWS.DynamoDB.DocumentClient(options);


    }
}