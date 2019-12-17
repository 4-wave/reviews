/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

const port = 3003;
const Controllers = require('./controllers.js');

app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/listing/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send('hello from server');
});

app.get('/api/listing/:id', (req, res) => {
  Controllers.getListing(req.params, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
