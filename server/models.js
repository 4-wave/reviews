/* eslint-disable no-console */
const { Pool, Client } = require('pg');
const format = require('pg-format');
const async = require('async');
const db = require('../config/models.config.js');
const Promise = require('bluebird');

const pool = new Pool({
  host: db.development.host,
  database: db.development.database
})
pool.connect()
pool.on('error', (err, pool) => {
  console.error('unexpected error', err)
  process.exit(-1)
})

module.exports = {
  db: pool,
  deleteUsers: () => {
    return new Promise( (resolve, reject) => { 
      pool.query('DELETE FROM reviews_schema.users', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("USERS RESET")
          resolve()
        }
      })
    })
  },
  users: (fakeUsers) => {
    let query = format('INSERT INTO reviews_schema.users (name, image) VALUES %L', fakeUsers)
    return new Promise( (resolve, reject) => { 
      pool.query(query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve();
        }
      })
    })

  },
  deleteOwners: () => {
    return new Promise( (resolve, reject) => { 
      pool.query('DELETE FROM reviews_schema.owners', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("OWNERS RESET")
          resolve();
        }
      })
    })
  },
  owners: (fakeData) => {
    const query = format('INSERT INTO reviews_schema.owners (name, image) VALUES %L returning id', fakeData)
    return new Promise( (resolve, reject) => { 
      pool.query(query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve()
        }
      });
    })
  },
  deleteListings: () => {
    return new Promise( (resolve, reject) => {
        pool.query('DELETE FROM reviews_schema.listings', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("LISTINGS RESET");
          resolve();
        }
      })
    })
  },
  listings: (d) => {
    let query = format(`INSERT INTO reviews_schema.listings (
      title, 
      owner_id, 
      overall_rating_avg,
      communication_rating_avg,
      cleanliness_rating_avg,
      check_in_rating_avg,
      accuracy_rating_avg,
      location_rating_avg,
      value_rating_avg,
      quick_responses_total,
      sparkling_clean_total,
      amazing_amenities_total,
      stylish_total,
      hospitality_total) VALUES %L`, 
    d );
    return new Promise( (resolve, reject) => {
        pool.query(query, (err, data) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          console.log("its writing")
          resolve();
        }
      });
    })
  },
  deleteReviews: () => {
    return new Promise( (resolve, reject) => {
        pool.query('DELETE FROM reviews_schema.reviews', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("REVIEWS RESET")
          resolve()
        }
      })
    })
  },
  reviews: (d) => {
    const query = format(`INSERT INTO reviews_schema.reviews (
      date, 
      review, 
      overall_rating, 
      communication_rating, 
      cleanliness_rating, 
      check_in_rating,
      accuracy_rating,
      value_rating,
      location_rating,
      quick_responses,
      sparkling_clean,
      amazing_amenities,
      stylish,
      hospitality,
      user_id,
      listing_id
      ) VALUES %L`, d);
    return new Promise( (resolve, reject) => {
        pool.query(query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve();
        }
      });
    })
  },
  deleteOwnerResponses: () => {
    return new Promise( (resolve, reject) => { 
      pool.query('DELETE FROM reviews_schema.reviews', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("OWNER RESPONSES RESET")
          resolve();
        }
      })
    })
  },
  ownerResponses: (fakeResponses) => {
    const query = format('INSERT INTO reviews_schema.owners_responses (response, date) VALUES %L', fakeResponses)
    return new Promise( (resolve, reject) => {
        pool.query(query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve();
        }
      });
    })
  },
  deleteUserReviews: () => {
    return new Promise( (resolve, reject) => { 
      pool.query('DELETE FROM reviews_schema.user_reviews', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("USER REVIEWS RESET")
          resolve();
        }
      })
    })
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
