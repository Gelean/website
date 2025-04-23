# Delder's Domain

My personal website files for www.elderek.com and www.derekmelder.com

## Hosting a static website in AWS

### Manual Steps

1. Login to https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2 (or set up an account if you don't have one)
1. Go to Services > Route 53
1. On the left hand side click on Registered domains under Domains
1. Click Register Domain
1. Enter in your desired domain name, check if it's available, and click Continue
1. Enter in your contact details and click Continue
1. Verify your details and click Purchase
1. Verify your email through the link Amazon sends you
1. Wait a little while for the domain to be registered (the time for this step can vary)
1. Go to Services > S3
1. Click on Create bucket
1. Use your website domain name for the bucket name (ex: www.elderek.com)
1. Choose a region for the bucket
1. Uncheck Block all public access
1. Click Create bucket
1. Click on the bucket name to go into the bucket
1. Click the Upload button
1. Drag over all of your website files and then click Upload
1. Click on the Properties tab
1. Click on Static website hosting
1. Click Use this bucket to host a website
1. Enter in your index html file (index.html by default)
1. Click Save
1. Click the Permissions tab
1. Click on Bucket Policy
1. Paste the following in (changing the domain name to your domain name):
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.elderek.com/*"
        }
    ]
}
```
27. Click Save
1. Click on CORS configuration
1. Paste the following in:
```
[
    {
        "AllowedHeaders": [
            "Authorization",
            "Content-Length"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```
30. Click Save
1. Optional: Enable Content-Encoding gzip compression per https://www.thepolyglotdeveloper.com/2018/10/serving-gzipped-javascript-files-amazon-s3/, see also: https://stackoverflow.com/questions/18456535/aws-s3-returns-200ok-parser-fails-if-contentencoding-gzip, https://stackoverflow.com/questions/5442011/serving-gzipped-css-and-javascript-from-amazon-cloudfront-via-s3
1. Optional: Enable Cache-Control per https://stackoverflow.com/questions/22501465/how-to-add-cache-control-in-aws-s3
1. Back in S3, click on Create bucket
1. Use your website domain name minus www for the bucket name (ex: elderek.com)
1. Choose a region close to you and click Next
1. Uncheck Block All Public Access
1. Click Create bucket
1. Click on the bucket name to go into the bucket
1. Click on the Properties tab
1. Click on Static website hosting
1. Click Redirect requests
1. In the Target bucket or domain field supply your other bucket's name (ex: www.elderek.com)
1. Click Save
1. Click back to Route 53
1. Click on Registered domains under Domains
1. Click on your new domain name (ex: elderek.com)
1. Click Manage DNS
1. Click on the domain name
1. Click Create Record Set
1. Enter www in the name field
1. Keep A - IPv4 address
1. Click Yes next to Alias
1. For the Alias target use the bucket alias from S3 (ex: s3-website-us-west-2.amazonaws.com.)
1. Leave Routing Policy and Evaluate Target Health alone
1. Click Save Record Set
1. Click Create Record Set
1. Leave the name field blank
1. Keep A - IPv4 address
1. Click Yes next to Alias
1. Use the Alias Target of your other record (ex: www.elderek.com.)
1. Click Save Record Set
1. Leave Routing Policy and Evaluate Target Health alone
1. Now type your website into your browser and confirm both addresses (ex: elderek.com and www.elderek.com) are working

### Using create-website.py

1. Read: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
1. Install aws-cli
1. Configure aws-cli credentials with aws configure
1. Install Python 3
1. ```pip install boto3 PyYaml```
1. Update the region, domain_name, and stack_name variables in create-website.py
1. ```py create-website.py```

## Docker image

### Setup the Docker container

1. ```cd to the root of the website folder```
1. ```docker build -t elderek-website-image:latest -f docker/Dockerfile .```
1. ```docker run -itd --name elderek-website-image-container --publish 8080:80 elderek-website-image:1.0```
1. ```docker ps -a```
1. Visit http://localhost:8080/home.html

### Tear down the Docker container


1. ```docker rm $(docker stop $(docker ps -aq --filter ancestor=elderek-website-image --format="{{.ID}}"))```
1. Alternate tear down commands:
    1. ```docker ps -aq | xargs -n 1 docker stop```
    1. ```docker ps -aq | xargs -n 1 docker rm```
1. ```docker system prune -a```
1. ```docker images -a```

## References and Code

* https://getbootstrap.com/
* https://codetheweb.blog/2017/12/07/fullscreen-image-hero/
* https://github.com/prabinmagar/product-filter-boostrap5-and-isotope-plugin
* https://www.pentacom.jp/pentacom/bitfontmaker2/
* https://transfonter.org
* https://dev.twitch.tv/docs/embed/everything
* https://steamprofile.com/
* https://blog.discordapp.com/add-the-discord-widget-to-your-site-d45ffcd718c6
* https://developers.google.com/youtube/player_parameters
* https://blackbirdpublishing.com/adding-a-goodreads-books-widget-to-your-author-website/
* https://medium.com/@kyle.galbraith/how-to-host-a-website-on-s3-without-getting-lost-in-the-sea-e2b82aa6cd38
* https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html#root-domain-walkthrough-s3-tasks
* https://favicon.io/favicon-generator/
* https://www.minifier.org
* https://developers.google.com/speed/pagespeed/insights/
* https://gtmetrix.com
* https://aws.amazon.com/premiumsupport/knowledge-center/s3-website-cloudfront-error-403/
* https://securityheaders.com
