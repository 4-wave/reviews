const db = require('../config/models.config.js');
const Promise = require('bluebird');
const { Pool, Client } = require('pg');
const path = require('path');
const Models = require('../server/seedModels.js');

const batchSize =  1000000;
const userNumber = 5000000;

const ownerNumber = 3000000;
const ownerResponseNumber = 1000000;
const listingNumber = 10000000;

const pool = new Pool({
  host: db.development.host,
  database: db.development.database
})

pool.connect()
pool.on('error', (err, pool) => {
  console.error('unexpected error', err)
  process.exit(-1)
})

let query = (q) => {
    return new Promise( (resolve, reject) => {
        pool.query(q, (err, res) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// users csv writing
const startWriting = async () => {
    let startWrite = Date.now();
    await Models.deleteUsers();
    let startUsers = Date.now();
    let usersArr = [];
    console.log('starting write to users from csvs');
    for (var i = 0; i < (userNumber/batchSize); i++){
        usersArr.push(query(`\copy reviews_schema.users(name, image) FROM '${path.resolve(__dirname, `../csvs/users/users${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `Users seeded ${i+1}mil`))
    }
    Promise.all(usersArr)
        .then(async () => {
            startUsers = Date.now() - startUsers;
            console.log('finished users write in ' + startUsers + ' ms');
            await Models.deleteOwners();
            console.log('starting owners write')
            let ownersArr = []
            let startOwners = Date.now();
            for (var i = 0 ; i < (ownerNumber/batchSize); i++) {
                ownersArr.push(query(`\copy reviews_schema.owners(name, image) FROM '${path.resolve(__dirname, `../csvs/owners/owners${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `owners seeded ${i+1}mil`))
            }
        Promise.all(ownersArr)
            .then( async () => {
                startOwners = Date.now() - startOwners;
                console.log('finished owners write in ' + startOwners + " ms")
                await Models.deleteOwnerResponses();

                console.log('starting owner responses write')
                let ownerResponsesArr = [];
                let startOR = Date.now();
                for (var i = 0; i < (ownerResponseNumber/batchSize); i++) {
                    ownerResponsesArr.push(query(`\copy reviews_schema.owner_responses(response, date) FROM '${path.resolve(__dirname, `../csvs/owner_responses/owner_responses${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `owner responses seeded ${i+1}mil`))
                }
            Promise.all(ownerResponsesArr)
                .then(async () => {
                    startOR = Date.now() - startOR;
                    console.log('finished owner responses write in ' + startOR + " ms");

                    await Models.deleteListings();

                    console.log('starting listings')
                    let listingsArr = [];
                    let startListings = Date.now();
                    for (var i = 0; i < (listingNumber/batchSize); i++) {
                        listingsArr.push(query(`\copy reviews_schema.listings(      
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
                            hospitality_total) FROM '${path.resolve(__dirname, `../csvs/listings/listings${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `listings seeded ${i+1}mil`))
                    }
                Promise.all(listingsArr)
                    .then(async () => {
                        startListings = Date.now() - startListings
                        console.log('finished writing listings in ' + startListings + " ms")
                        await Models.deleteReviews();
                
                        console.log('starting reviews')
                        let reviewsArr = [];
                        let startReviews = Date.now();
                        for (var i = 0; i < (listingNumber/batchSize); i++) {
                            reviewsArr.push(query(`\copy reviews_schema.reviews(
                                date, 
                                review, 
                                overall_rating, 
                                communication_rating, 
                                cleanliness_rating, 
                                check_in_rating,
                                accuracy_rating,
                                location_rating,
                                value_rating,
                                quick_responses,
                                sparkling_clean,
                                amazing_amenities,
                                stylish,
                                hospitality,
                                user_id,
                                listing_id) FROM '${path.resolve(__dirname, `../csvs/reviews/reviews${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `reviews seeded ${i+1}mil`))
                        }
                    Promise.all(reviewsArr)
                        .then(async () => {
                            startReviews = Date.now() - startReviews;
                            console.log('completed reviews in ' + startReviews + " ms");

                            await Models.deleteUserReviews();

                            console.log('writing user_reviews')

                            let userReviewsArr = [];
                            let startUserReviews = Date.now();
                            for (var i = 0; i < (listingNumber/batchSize); i++) {
                                userReviewsArr.push(query(`\copy reviews_schema.user_reviews(user_id, listing_id, review_id, owner_id) FROM '${path.resolve(__dirname, `../csvs/user_reviews/user_reviews${i}.csv`)}' DELIMITER ',' CSV HEADER;`, `user_reviews seeded ${i+1}mil`))
                            }
                        Promise.all(userReviewsArr)
                            .then(() => {
                                startUserReviews = Date.now() - startUserReviews;
                                console.log('completed user_reviews in ' + startUserReviews + ' ms');
                                startWrite = Date.now() - startWrite;
                                console.log('completed write in ' + startWrite + " ms");
                            })
                        })
                    })
                })
            })
        })
}

startWriting();
