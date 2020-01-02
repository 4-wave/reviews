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

let q = `SELECT * FROM reviews_schema.reviews WHERE listing_id = 1234`;
console.log('query to find all the reviews for listing of id 12345');
let t0 = Date.now()
pool.query(q, (err, res) => {
    if (err) {
        throw err
    } else {
        console.log(res.rows)
        console.log('Query took ' + (Date.now() - t0) + " ms" );
    }
})

// q = `SELECT * FROM reviews_schema.users WHERE id = 12345`;
// console.log('query to select user with id 12345');
// t0 = Date.now()
// pool.query(q, (err, res) => {
//     if (err) {
//         throw err
//     } else {
//         console.log(res.rows)
//         console.log('Query took ' + (Date.now() - t0) + " ms" );
//     }
// })