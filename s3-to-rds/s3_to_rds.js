'use strict';

const AWS = require('aws-sdk');
const {Client} = require('pg')

const createTableText = `CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);`

const ensureSchema = (client) => {
    return client.query(createTableText)
}

const errorReporter = (callback) => (err) => {
    console.log(err);
    callback(err);
}

const insertContent = (client, event) => {
    return client.query('SELECT NOW()');
}

module.exports.handler = (event, context, callback) => {
    const client = new Client();
    const errorCallback = errorReporter(callback);
    
    client.connect((err) => {
        if (err) {
            errorCallback(err);
            return;
        }
        
        ensureSchema(client)
            .then(
                insertContent(event)
                    .then((res) => {
                        console.log(JSON.stringify(res))
                        callback(null, res);
                    })
                    .catch(errorCallback)
            )
            .catch(errorCallback)
            .then(() => {
                console.log({'message': 'Complete'})
                client.end();
            });
    });
};