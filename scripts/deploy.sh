#!/bin/bash -ex

pwd

cd s3-to-kinesis

ls -la ..

SERVERLESS=../node_modules/serverless/bin/serverless

ls -la

$SERVERLESS deploy -v