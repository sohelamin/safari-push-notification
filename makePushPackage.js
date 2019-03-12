const fs = require('fs');
const path = require('path');
const pushLib = require('safari-push-notifications');

const cert = fs.readFileSync('certificates/cert.pem');
const key = fs.readFileSync('certificates/key.pem');
const intermediate = fs.readFileSync('certificates/AppleWWDRCA.pem');
const websiteJson = pushLib.websiteJSON(
  'SiteName', // Site Name
  'web.yourdomain.com', // Safari Push ID
  ['https://yourdomain.com'], // Allowed Domains
  'https://yourdomain.com/notification/%@', // Notification Click URL Pattern
  '19f8d7a6e9fb8a7f6d9330dabe957043', // Authentication Token
  'https://yourdomain.com', // Push Server
);
pushLib.generatePackage(
  websiteJson,
  path.join('assets', 'icon.iconset'),
  cert,
  key,
  intermediate,
)
  .pipe(fs.createWriteStream('pushPackage.zip'))
  .on('finish', () => {
    console.log('pushPackage.zip is ready.');
  });
