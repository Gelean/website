#!/usr/bin/env python3

import boto3
from botocore.exceptions import ClientError
import os
import pathlib
import time
import sys
import glob

# Set up region, domain name, bucket name, stack name, cloudformation file, and boto clients
region = 'us-east-1'
domain_name = 'derekmelder.com'
stack_name = 'derekmelder-website-stack'
bucket_name = 'www.' + domain_name
cloudformation_file = 'website.yml'

s3_client = boto3.client('s3', region_name=region)
cloudformation_client = boto3.client('cloudformation', region_name=region)

class MyStr(str):
    __eq__ = str.__contains__

def upload_files(file_array):
    for file in file_array:
        content_type = ''
        match MyStr(file):
            case '.doc':
                content_type = 'application/msword'
            case '.pdf':
                content_type = 'application/pdf'
            case '.html':
                content_type = 'text/html'
        s3_client.upload_file(Filename=file, Key=file, Bucket=bucket_name, ExtraArgs={'ContentType': content_type})

# Handle uploading files in directories and subdirectories
def upload_files_from_dir(path):
    for subdir, dirs, files in os.walk(path):
        for file in files:
            full_file_path = os.path.join(subdir, file)
            full_file_path = pathlib.PureWindowsPath(full_file_path).as_posix()
            content_type = ''
            match MyStr(full_file_path):
                case '.doc':
                    content_type = 'application/msword'
                case '.pdf':
                    content_type = 'application/pdf'
                case '.js':
                    content_type = 'application/javascript'
                case '.html':
                    content_type = 'text/html'
                case '.txt':
                    content_type = 'text/plain'
                case '.json':
                    content_type = 'application/json'
                case '.ico':
                    content_type = 'image/x-icon'
                case '.svg':
                    content_type = 'image/svg+xml'
                case '.css':
                    content_type = 'text/css'
                case '.jpg':
                    content_type = 'image/jpeg'
                case '.jpeg':
                    content_type = 'image/jpeg'
                case '.png':
                    content_type = 'image/png'
                case '.webp':
                    content_type = 'image/webp'
                case '.map':
                    content_type = 'binary/octet-stream'
                case _:
                   content_type = 'application/octet-stream'
            s3_client.upload_file(Filename=full_file_path, Key=full_file_path, Bucket=bucket_name, ExtraArgs={'ContentType': content_type})

# Run Cloudformation script to set up the S3 bucket, SSL certificate, Cloudfront distribution, and other resources
try:
    data = cloudformation_client.describe_stacks(StackName = stack_name)
    if data['Stacks'][0]['StackName'] == stack_name:
        print('Stack already exists, updating')
        cf_template = open(cloudformation_file).read()
        response = cloudformation_client.update_stack(
            StackName=stack_name,
            TemplateBody=cf_template,
            Parameters=[
                { 'ParameterKey': 'DomainName', 'ParameterValue': domain_name },
                { 'ParameterKey': 'HostedZoneId', 'ParameterValue': 'Z0964632EZ0WHJY58ADN' },
                { 'ParameterKey': 'PriceClass', 'ParameterValue': 'PriceClass_100' }
            ],
            Capabilities=['CAPABILITY_IAM']
        )

        # Wait for stack to update before uploading files
        sys.stdout.write('Waiting for the Cloudformation stack update to finish')
        stack_status = cloudformation_client.describe_stacks(StackName=stack_name)['Stacks'][0]['StackStatus']
        while stack_status != 'UPDATE_COMPLETE':
            # Try again every thirty seconds until the stack has finished updating
            for i in range(10,0,-1):
                sys.stdout.write('.')
                sys.stdout.flush()
                time.sleep(1)
            stack_status = cloudformation_client.describe_stacks(StackName=stack_name)['Stacks'][0]['StackStatus']
            if stack_status in ['UPDATE_ROLLBACK_COMPLETE', 'ROLLBACK_COMPLETE', 'DELETE_COMPLETE', 'IMPORT_COMPLETE', 'IMPORT_ROLLBACK_COMPLETE']:
                print('An error has occurred. The stack status is reporting: {}, please investigate'.format(stack_status))
                exit(1)
except ClientError as error:
    if str(error) == "An error occurred (ValidationError) when calling the UpdateStack operation: No updates are to be performed.":
        print("The stack exists, but there are no updates to be performed, skipping the CloudFormation update step.")
    elif str(error) == f"An error occurred (ValidationError) when calling the DescribeStacks operation: Stack with id {stack_name} does not exist":
        print('Stack does not exist, creating {}'.format(stack_name))
        cf_template = open(cloudformation_file).read()
        response = cloudformation_client.create_stack(
            StackName=stack_name,
            TemplateBody=cf_template,
            Parameters=[
                { 'ParameterKey': 'DomainName', 'ParameterValue': domain_name },
                { 'ParameterKey': 'HostedZoneId', 'ParameterValue': 'Z0964632EZ0WHJY58ADN' },
                { 'ParameterKey': 'PriceClass', 'ParameterValue': 'PriceClass_100' }
            ],
            Capabilities=['CAPABILITY_IAM']
        )

        # Wait for stack to be created before uploading files
        sys.stdout.write('Waiting for the Cloudformation stack creation to finish')
        stack_status = cloudformation_client.describe_stacks(StackName=stack_name)['Stacks'][0]['StackStatus']
        while stack_status != 'CREATE_COMPLETE':
            # Try again every thirty seconds until the stack is available
            for i in range(30,0,-1):
                sys.stdout.write('.')
                sys.stdout.flush()
                time.sleep(1)
            stack_status = cloudformation_client.describe_stacks(StackName=stack_name)['Stacks'][0]['StackStatus']
            if stack_status in ['UPDATE_ROLLBACK_COMPLETE', 'ROLLBACK_COMPLETE', 'DELETE_COMPLETE', 'IMPORT_COMPLETE', 'IMPORT_ROLLBACK_COMPLETE']:
                print('An error has occurred. The stack status is reporting: {}, please investigate'.format(stack_status))
                exit(1)

print('Files are being uploaded')

# Pick up html, doc, and pdf files in the root folder
types = ('*.html', '*.doc', '*.pdf')
root_files = []
for files in types:
    root_files.extend(glob.glob(files))
upload_files(root_files)

# Upload files in subdirectories
upload_files_from_dir('bootstrap')
upload_files_from_dir('css')
upload_files_from_dir('fonts')
upload_files_from_dir('images')
upload_files_from_dir('js')
