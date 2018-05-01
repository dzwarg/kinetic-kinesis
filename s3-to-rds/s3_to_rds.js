'use strict';

const AWS = require('aws-sdk');
const { Pool, Client } = require('pg')

const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

module.exports.handler = (event, context, callback) => {
    console.log(`host: ${process.env.POSTGRES_HOST}`)
    console.log(`user: ${process.env.POSTGRES_USER}`)
    console.log(`db  : ${process.env.POSTGRES_DATABASE}`)
    
    const client = new Client({
      user: 'dbuser',
      host: 'database.server.com',
      database: 'mydb',
      password: 'secretpassword',
      port: 3211,
    });
    
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