const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const apn = require('apn');

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

const tokens = [];

router.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/index.html`));
});

router.post('/:version/pushPackages/web.yourdomain.com', (req, res) => {
  res.sendFile('pushPackage.zip', { root: __dirname });
});

router.post('/:version/devices/:deviceToken/registrations/web.yourdomain.com', (req, res) => {
  console.log(req.params.deviceToken);
  tokens.push(req.params.deviceToken);
  res.send('Saved!');
});

router.post('/:version/log', (req, res) => {
  console.log(req.body);
  res.send('Log!');
});

router.post('/send', async (req, res) => {
  try {
    const { alert } = req.body;
    console.log(req.body);

    const service = new apn.Provider({
      cert: 'certificates/cert.pem',
      key: 'certificates/key.pem',
      production: true,
    });

    const note = new apn.Notification({ alert });

    note.urlArgs = ['6514249a-4cb8-451b-a889-88f5913c9a7f'];

    console.log(`Sending: ${note.compile()} to ${tokens}`);
    const result = await service.send(note, tokens);
    console.log('sent:', result.sent.length);
    console.log('failed:', result.failed.length);
    console.log(result.failed);

    service.shutdown();
  } catch (e) {
    console.log(e);
  }

  res.send('Sent!');
});

app.use(router);

app.listen(3000, () => console.log('Listening on port 3000!'));
