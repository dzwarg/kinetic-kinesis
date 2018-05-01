'use strict';

const AWS = require('aws-sdk');

/*

** Sample S3 Put Event **

{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "s3": {
        "configurationId": "testConfigRule",
        "object": {
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901",
          "key": "HappyFace.jpg",
          "size": 1024
        },
        "bucket": {
          "arn": bucketarn,
          "name": "sourcebucket",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          }
        },
        "s3SchemaVersion": "1.0"
      },
      "responseElements": {
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
        "x-amz-request-id": "EXAMPLE123456789"
      },
      "awsRegion": "us-east-1",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "eventSource": "aws:s3"
    }
  ]
}
 */
module.exports.hello = (event, context, callback) => {
  const firehose = new AWS.Firehose();

  const params = {
    DeliveryStreamName: `${process.env.STREAM}`,
    Record: {
      Data: JSON.stringify(event)
    }
  };

  return firehose.putRecord(params, (error, data) => {
    if (error) {
      console.log(error);
      callback(error);
    }
    const msg = { message: `Data successfully written to Kinesis stream ${process.env.STREAM}` };
    console.log(JSON.stringify(msg));
    callback(null, msg);
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
