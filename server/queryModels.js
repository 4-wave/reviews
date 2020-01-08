const { Pool, Client } = require('pg');
const db = require('../config/models.config.js');

const pool = new Pool({
    host: db.development.host,
    database: db.development.database
})
pool.connect()
pool.on('error', (err, pool) => {
    console.error('unexpected error', err)
    process.exit(-1)
})

pool.on('connect', (client) => {
    client.query(`set search_path to reviews_schema`);
})

module.exports = {
    getReview: (callback, id) => {
        const q = `select users.name, users.image, reviews.date, reviews.review, owners.name, owners.image, owner_responses.response from user_reviews join users on user_reviews.user_id = users.id left join reviews on user_reviews.review_id = reviews.id left join owners on user_reviews.owner_id = owners.id left join owner_responses on owners.id = owner_responses.owner_id where user_reviews.listing_id = 124;`
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    getReviews: (callback, id) => {
        const q = `select review from reviews_schema.reviews where listing_id = ${id}`
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        });
    },
    deleteReview: (callback, id) => {
        const q = ``;
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    createReview: (callback, data) => {
        const q = ``;
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    updateReview: (callback, id) => {
        const q = ``;
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    }

}