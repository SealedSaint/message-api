const express = require('express');

const app = express();

const messageStore = [];

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/messages', (req, res) => {
  res.json({ messages: messageStore });
});
app.post('/messages', (req, res) => {
  const message = req.body;
  messageStore.unshift(message);
  res.sendStatus(201);
});

const port = 3000;
app.listen(port, () => { console.log(`Example app listening on port ${port}!`); });
