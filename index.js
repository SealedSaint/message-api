const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const { dev: devConfig, prod: prodConfig } = require('./config.js');

// Load the correct config for the environment
let config = devConfig;
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'prod' || nodeEnv === 'production') {
  config = prodConfig;
}

console.log('Config is:', config);
const dbURI = config.DB_URI;

const app = express();

app.use(express.json());

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GET: INDEX WELCOME
app.get('/', (req, res) => res.send('Hello World!'));

// GET MESSAGES
app.get('/messages', (req, res) => {
  MongoClient.connect(dbURI, (err, client) => {
    if (err) { console.error(err); return; }

    const messageCol = client.db('test').collection('messages');
    messageCol.find().toArray((err, messages) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log('Found messages: ', messages);
        res.json(messages);
      }

      client.close();
    });
  });
});

// POST MESSAGES
app.post('/messages', (req, res) => {
  const message = req.body;

  MongoClient.connect(dbURI, (err, client) => {
    if (err) { console.error(err); return; }

    const messageCol = client.db('test').collection('messages');
    messageCol.insert(message, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }

      client.close();
    });
  });
});

const port = 3000;
app.listen(port, () => { console.log(`Example app listening on port ${port}!`); });
