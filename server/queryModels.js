const { Pool, Client } = require('pg');
const db = require('../config/models.config.js');
const format = require('pg-format');

const pool = new Pool({
    host: db[process.env.NODE_ENV].host,
    database: db[process.env.NODE_ENV].database,
    user: db[process.env.NODE_ENV].user,
    password: db[process.env.NODE_ENV].password
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
        const q = `SELECT users.name, users.image, reviews.date, reviews.review, owners.name as ownersName, owners.image as ownersImage, owner_responses.response as ownerResponse, owner_responses.date as ownerResponseDate from user_reviews left join users on user_reviews.user_id = users.id left join reviews on user_reviews.review_id = reviews.id left join owners on user_reviews.owner_id = owners.id left join owner_responses on owners.id = owner_responses.owner_id where user_reviews.listing_id = ${id};`
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    getListing: (callback, id) => {
        const q = `select * from listings where id = ${id}`
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    getReviews: (callback, id) => {
        const q = `select * from user_reviews left join reviews on user_reviews.review_id = reviews.id where user_reviews.listing_id = ${id}`
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        });
    },
    deleteReview: (callback, id) => {
        const q = `DELETE FROM reviews WHERE id = (SELECT id FROM reviews where listing_id = 134 ORDER BY id desc limit 1)`;
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    createReview: (callback, data) => {
        const q = format(`INSERT INTO reviews (
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
            ) VALUES %L`, data)
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    },
    updateReview: (callback, id, data) => {
        const q = `UPDATE reviews SET review = ${data} FROM reviews WHERE id = (SELECT id FROM reviews where listing_id = ${id} ORDER BY id desc limit 1)`;
        pool.query(q, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(null, results)
            }
        })
    }

}