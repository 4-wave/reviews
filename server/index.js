/* eslint-disable import/no-extraneous-dependencies */
// require('newrelic');
const express = require('express');
const cors = require('cors');
const faker = require('faker');

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
  let id = (Math.random() * 10000000)
  Controllers.getData(id, res)
})

app.get('/getReviews', (req, res) => {
  let id = 1234;
  Controllers.getReviews(id, res);
});

app.post('/createReview', (req, res) => {
  let arr = [[
    faker.date.past(),
    (faker.lorem.words()),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random() * 3) + 2),
    (Math.round(Math.random()) === 1),
    (Math.round(Math.random()) === 1),
    (Math.round(Math.random()) === 1),
    (Math.round(Math.random()) === 1),
    (Math.round(Math.random()) === 1),
    (Math.round(Math.random() * 5000000)),
    (Math.round(Math.random() * 10000000))
  ]]
  Controllers.createReview(arr, res)
})

app.delete('/deleteReview', (req, res) => {
  Controllers.deleteReview(id, res)
})

app.put('/updateReview', (req, res) => {
  Controllers.updateReview(id, res)
})

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