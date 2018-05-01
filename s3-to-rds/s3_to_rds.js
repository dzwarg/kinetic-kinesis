'use strict';

const AWS = require('aws-sdk');
const { Pool, Client } = require('pg')

module.exports.handler = (event, context, callback) => {
    const client = new Client();
    
    client.connect();
    
    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        
        console.log(null, res);
        client.end();
    });
    
};