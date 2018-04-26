#!/bin/bash -ex

pwd

cd s3-to-kinesis

SERVERLESS=../node_modules/serverless/bin/serverless

$SERVERLESS deploy -v