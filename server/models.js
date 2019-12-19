/* eslint-disable no-console */
const { Pool, Client } = require('pg');
const async = require('async');
const db = require('../config/models.config.js');

const client = new Client({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

module.exports = {
  users: (fakeUser) => {
    const queryVal = [fakeUser.name, fakeUser.image];
    const query = 'INSERT INTO users (name, image) VALUES(?, ?)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  owners: (fakeData) => {
    const queryVal = [fakeData.name, fakeData.image];
    const query = 'INSERT INTO owners (name, image) VALUES(?, ?)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  listings: (d) => {
    const queryVal = [d.title, d.avg_rating, d.communication,
    d.check_in, d.accuracy, d.value, d.location,
    d.cleanliness,
    d.hospitality, d.stylish, d.sparkling_clean,
    d.quick_responses, d.amazing_amenities, d.counts, d.owners_id];

    const query = 'INSERT INTO listings (title, avg_rating, communication, check_in, accuracy, value, cleanliness, location, hospitality, stylish,sparkling_clean, quick_responses, amazing_amenities, counts, owners_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  reviews: (fakeData) => {
    const queryVal = [fakeData.date, fakeData.review, fakeData.users_id, fakeData.listings_id];
    const query = 'INSERT INTO reviews (date, review, users_id, listings_id) VALUES(?, ?, ?, ?)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  ownersResponses: (fakeResponses) => {
    const queryVal = [fakeResponses.response,
      fakeResponses.date, fakeResponses.reviews_id, fakeResponses.owners_id];
    const query = 'INSERT INTO owners_responses (response, date, reviews_id, owners_id) VALUES(?, ?, ?, ?)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  getListing: (callback, id) => {
    const query1 = `select * from listings where id = ${id.id}`;
    const query2 = `select users.name, users.image, reviews.date, reviews.review, owners.name as ownersName, owners.image as ownersImage, owners_responses.response, owners_responses.date as ownersResponseDate from reviews join users on reviews.users_id = users.id left join owners_responses on reviews.id = owners_responses.reviews_id left join owners on owners.id = owners_responses.owners_id where reviews.listings_id = ${id.id}`;
    const returnedData = {};

    async.parallel([(parallelDone) => {
      client.query(query1, {}, (err, results) => {
        if (err) {
          parallelDone(err);
        }
        returnedData.stats = results;
        parallelDone();
      });
    }, (parallelDone) => {
      client.query(query2, {}, (err, results) => {
        if (err) {
          parallelDone(err);
        }
        returnedData.reviews = results;
        parallelDone();
      });
    }], (err) => {
      if (err) console.log(err);
      callback(null, returnedData);
    });
  },
};
