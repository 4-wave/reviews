/* eslint-disable no-console */
const { Pool, Client } = require('pg');
const async = require('async');
const db = require('../config/models.config.js');

const client = new Client({
  host: db.development.host,
  database: db.development.database
})
client.connect()

// client.on('error', (err, client) => {
//   console.error('unexpected error', err)
//   process.exit(-1)
// })

module.exports = {
  db: client,
  deleteUsers: () => {
    client.query('DELETE FROM reviews_schema.users', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log("USERS RESET")
      }
    })
  },
  users: (fakeUser, idx = null) => {
    const queryVal = [fakeUser.name, fakeUser.image];
    const query = 'INSERT INTO reviews_schema.users (name, image) VALUES($1, $2)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("user successfully created ", idx);
      }
    });
  },
  deleteOwners: () => {
    client.query('DELETE FROM reviews_schema.owners', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log("OWNERS RESET")
      }
    })
  },
  owners: (fakeData, idx = null) => {
    const queryVal = [fakeData.name, fakeData.image];
    const query = 'INSERT INTO reviews_schema.owners (name, image) VALUES($1, $2)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("owner successfully created ", idx);
      }
    });
  },
  deleteListings: () => {
    client.query('DELETE FROM reviews_schema.listings', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("LISTINGS RESET");
      }
    }) 
  },
  listings: (d) => {
    const queryVal = [
      d.title,
      d.owner_id
    ];

    const query = 'INSERT INTO reviews_schema.listings (title, owner_id) VALUES(?, ?)';

    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  },
  updateListing: (d, i) => {
    const queryVal = [
      d.totalOverall,
      d.totalCleanliness,
      d.totalCheckIn,
      d.totalAccuracy,
      d.totalValue,
      d.totalLocation,
      d.totalQuick,
      d.totalSparkling,
      d.totalAmazing,
      d.totalStylish,
      d.totalHospitality,
    ]
    const query = `UPDATE reviews_schema.listings SET (overall_rating_avg, communication_rating_avg, check_in_rating_avg, accuracy_rating_avg, location_rating_avg, value_rating_avg, quick_responses_total, sparkling_clean_total, amazing_amenities_total, stylish_total, hospitality_total) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE id = ${id}`
  },
  deleteReviews: () => {
    client.query('DELETE FROM reviews_schema.reviews', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log("REVIEWS RESET")
      }
    })
  },
  reviews: (fakeData) => {
    const queryVal = [
      fakeData.date,
      fakeData.review,
      fakeData.overall_rating,
      fakeData.cleanliness_rating,
      fakeData.check_in_rating,
      fakeData.accuracy_rating,
      fakeData.value_rating,
      fakeData.location_rating,
      fakeData.quick_responses,
      fakeData.sparkling_clean,
      fakeData.amazing_amenities,
      fakeData.stylish,
      fakeData.hospitality
    ]
    const query = 'INSERT INTO reviews_schema.reviews (date, review, overall_rating, cleanliness_rating, check_in_rating,accuracy_rating,value_rating,location_rating,quick_responses,sparkling_clean,amazing_amenities,stylish,hospitality) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("created review");
      }
    });
  },
  deleteOwnerResponses: () => {
    client.query('DELETE FROM reviews_schema.reviews', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log("OWNER RESPONSES RESET")
      }
    })
  },
  ownersResponses: (fakeResponses) => {
    const queryVal = [fakeResponses.response, fakeResponses.date];
    const query = 'INSERT INTO reviews_schema.owners_responses (response, date) VALUES($1, $2)';
    client.query(query, queryVal, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("created owner response");
      }
    });
  },
  getListing: (callback, id) => {
    const query1 = `select * from listings where id = ${id.id}`;
    const query2 = `select users.name, users.image, reviews.date, reviews.review, owners.name as ownersName, owners.image as ownersImage, owners_responses.response, owners_responses.date as ownersResponseDate from reviews join users on reviews.users_id = users.id left join owners_responses on reviews.id = owners_responses.reviews_id left join owners on owners.id = owners_responses.owners_id where reviews.listings_id = ${id.id}`;
    const returnedData = {};
      client.query(query1, [1], (err, results) => {
        if (err) {
          done(err);
          // parallelDone
        } else {
          returnedData.stats = results;
          done();
        }
        // parallelDone
      });
  }
}
  //   async.parallel([(parallelDone) => {
  //     pool.query(query1, [1], (err, results) => {
  //       if (err) {
  //         parallelDone(err);
  //       }
  //       debugger
  //       returnedData.stats = results;
  //       parallelDone();
  //     });
  //   }, (parallelDone) => {
  //     pool.query(query2, {}, (err, results) => {
  //       if (err) {
  //         parallelDone(err);
  //       }
  //       returnedData.reviews = results;
  //       parallelDone();
  //     });
  //   }], (err) => {
  //     if (err) console.log(err);
  //     callback(null, returnedData);
  //   });
  // },
// };
