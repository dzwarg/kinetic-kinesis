# kinetic-kinesis
An experiment with AWS, integrating S3, Kinesis, and RDS


## Status

[![Build Status](https://travis-ci.org/dzwarg/kinetic-kinesis.svg?branch=db)](https://travis-ci.org/dzwarg/kinetic-kinesis)

# Pipeline

This pipeline uses the Serverless tool to deploy two AWS Lambda functions:

* `s3tokinesis`
* `s3tords`

In addition, the customization of the underlying CloudFormation stack also
provisions the following AWS resources to support the full data pipeline:

* S3 Buckets (`input` and `streams`)
* Kinesis Firehose Delivery Stream
* IAM Roles
* IAM Policies
* RDS Cluster
* RDS Instance
* EC2 Security Group
* EC2 Subnets
* EC2 Subnet Group
* EC2 VPC

The entire infrastructure for the pipeline is self-contained in the
`serverless.yml` file, so it should be able to be deployed into your own AWS
account (for the intrepid). I cannot guarantee this will not destroy something
sacred, so **do not deploy this into a production account**.


## Requirements

To deploy this to your own AWS infrastructure, you will need the following 
environment variables set prior to running the deployment command:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `PGDATABASE`
* `PGPASSWORD`
* `PGUSER`

All other connection information to the RDS databases are derived from the
resources upon creation (`PGHOST`, `PGDATABASE`), and the port is the default
(`5432`).

# Contributors

* [David Zwarg](https://dzwarg.github.io/)