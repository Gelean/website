# Delder's Domain
My personal website files for www.elderek.com

## Hosting a static website in AWS

1. Login to https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2 (or set up an account if you don't have one)
1. Go to Services > Route 53
1. On the left hand side click on Registered domains under Domains
1. Click Register Domain
1. Enter in your desired domain name
1. Enter in your contact details
1. Verify your details and click on purchase
1. Verify your email through the link Amazon sends you
1. Wait a little while for the domain to be registered (the time for this step can vary)
1. Go to Services > S3
1. Click on Create bucket
1. Use your website domain name for the bucket name (ex: www.elderek.com)
1. Choose a region close to you and click Next
1. Uncheck Block All Public Access
1. Click Create bucket
1. Click on the bucket name to go into the bucket
1. Click the Upload button
1. Add all of your website files and then Next
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
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>    
        <AllowedHeader>Content-Length</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
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
1. The following steps outline how to get HTTPS working (WORK IN PROGRESS)
1. Go to Services > Certificate Manager
1. Click Get Started under Provision certificates
1. Switch to the N. Virginia region (us-east-1) so the certificate will be available to Cloudfront
1. Request a public certificate will be checked by default
1. Click Request a Certificate
1. Type your domain name into the box (ex: www.elderek.com)
1. Click Add another name to this certificate
1. Type in your wildcard domain (ex: *.elderek.com)
1. Click Next
1. Leave DNS validation checked
1. Click Review
1. Click Confirm and request
1. On the Validation window click on both Create record in Route 53 buttons
1. After both succeed click Continue
1. Amazon will then validate the domain name, it may take a few minutes
1. Once the certificates are issued go to Services > Cloudfront
1. Create Distribution
1. Click Get Started
1. Under Origin domain name select your domain name (ex: www.elderek.com.s3.amazonaws.com)
1. Check "Redirect HTTP to HTTPS"
1. Under Price Class choose "Use only US, Canada and Europe" 
1. Under Alternate Domain Names (CNAMEs) type in both of your domains (ex: www.elderek.com, elderek.com, *.elderek.com)
1. Under SSL Certificate check "Custom SSL Certificate (example.com)" and in the dropdown select your domain (ex: www.elderek.com...)
1. Click Create Distribution
1. This next step may take some time so monitor the Status and wait for it to change from In Progress to Deployed
1. Go to Services > Route 53
1. Click on Hosted Zones
1. Click on your domain name
1. Click Create Record Set
1. Enter www in the name field
1. Keep A - IPv4 address
1. Click Yes next to Alias
1. Click the Alias Target and select the CloudFront distribution relating to your domain name
1. Click Save Record Set

## References and Code
* https://getbootstrap.com/
* https://codetheweb.blog/2017/12/07/fullscreen-image-hero/
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
