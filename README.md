# Safari Push Notification
> Push Notification Implementation on Safari
## Pre-requisites
- HTTPS enabled site
- Apple developer certificate (.p12)

## Installation
```
npm install
```

## Usage
1. Register and download your apple certificate from https://developer.apple.com/account/ios/certificate

2. Put those files into certificates directory

3. Then generate the expected certificate & key file using these commands
  ```
  openssl x509 -in website_aps_production.cer -inform DER -outform PEM -out cert.pem
  openssl pkcs12 -in Certificates.p12 -out key.pem -nodes
  openssl x509 -inform der -in AppleWWDRCA.cer -out AppleWWDRCA.pem
  ```

4. Run the app
  ```
  node app.js
  ```

5. Visit your site on safari and subscribe the push notification

6. Send notification to the subscribed users
  ```bash
  curl -XPOST -H 'Content-Type: application/json' https://yourdomain.com/send -d '
  {
    "alert": {
      "title": "Push Test",
      "body": "Hello, this is my first push notification"
    }
  }
  '
  ```
