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
1. Register and download your apple certificate from [Apple Developer Console](https://developer.apple.com/account/ios/certificate) or follow [this article](https://pushalert.co/documentation/creating-safari-web-push-certificate) for details

2. Put those files (eg. `website_aps_production.cer` & `Certificates.p12`) into certificates directory

3. Then generate the expected certificate & key file using these commands
  ```
  openssl x509 -in website_aps_production.cer -inform DER -outform PEM -out cert.pem
  openssl pkcs12 -in Certificates.p12 -out key.pem -nodes
  openssl x509 -inform der -in AppleWWDRCA.cer -out AppleWWDRCA.pem
  ```

4. Replace the push package related info in [app.js](app.js), [makePushPackage.js](makePushPackage.js) & [client/index.html](client/index.html) files

5. Run the app
  ```
  node app.js
  ```

6. Visit your site on safari and subscribe the push notification

7. Send notification to the subscribed users
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
