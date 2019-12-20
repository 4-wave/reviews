/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

const port = 3003;

const couchbase = require('couchbase')
const Controllers = require('./controllers.js');

const cluster = new couchbase.Cluster('couchbase://127.0.0.1:8091//');
cluster.authenticate('Administrator', 'password');

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

// const bucket = cluster.openBucket('default');
// let couchbaseConnect = false;

// const N1qlQuery = couchbase.N1qlQuery;

// bucket.on('error', function (err) {
//   couchbaseConnected = false;
//   console.log('CONNECT ERROR:', err);
// });

// bucket.on('connect', function () {
//   couchbaseConnected = true;
//   console.log('connected couchbase');
// });
// bucket.manager().createPrimaryIndex(function() {
//   bucket.upsert('user:king_arthur', {
//     'email': 'kingarthur@couchbase.com', 'interests': ['Holy Grail', 'African Swallows']
//   },
//   function (err, result) {
//     bucket.get('user:king_arthur', function (err, result) {
//       console.log('Got result: %j', result.value);
//       bucket.query(
//       N1qlQuery.fromString('SELECT * FROM bucketname WHERE $1 in interests LIMIT 1'),
//       ['African Swallows'],
//       function (err, rows) {
//         console.log("Got rows: %j", rows);
//       });
//     });
  // });
// });