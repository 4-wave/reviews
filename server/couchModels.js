const couchbase = require('couchbase')

const cluster = new couchbase.Cluster('couchbase://127.0.0.1:8091//');
cluster.authenticate('Administrator', 'password');

const usersBucket = cluster.openBucket('users');
const usersManager = usersBucket.manager();

const ownersBucket = cluster.openBucket('owners');
const ownersManager = ownersBucket.manager();

const listingsBucket = cluster.openBucket('listings');
const listingsManager = listingsBucket.manager();

const reviewsBucket = cluster.openBucket('reviews');
const reviewsManager = reviewsBucket.manager();

const ownerResponses = cluster.openBucket('owner_responses');
const responsesManager = ownerResponses.manager();

module.exports = {
    flushUsers: () => {
        return new Promise( (resolve, reject) => {
            usersManager.flush( (err, status) => {
                if (status) {
                    console.log('users flushed');
                    resolve();
                } else {
                    console.log('could not flush bucket', err);
                    reject();
                }
            })
        })
    },
    users: (data) => {
        return new Promise ( (resolve, reject) => {
            for (var i = 0; i < data.length; i++) {
                usersBucket.insert(data[i].id, {name: data[i].name, image: data[i].image}, (err, res) => {
                    if (err) {
                        throw err;
                    }
                    resolve();
                })
            }

        })
    },
    flushOwners: () => {
        return new Promise( (resolve, reject) => {
            ownersManager.flush( (err, status) => {
                if (status) {
                    console.log('owners flushed');
                    resolve();
                } else {
                    console.log('could not flush bucket', err);
                    reject();
                }
            })
        })
    },
    owners: (data) => {
        return new Promise ( (resolve, reject) => {
            for (var i = 0; i < data.length; i++) {
                ownersBucket.insert(data[i].id, {name: data[i].name, image: data[i].image}, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve();
                })
            }

        })
    },
    flushListings: () => {
        return new Promise( (resolve, reject) => {
            listingsManager.flush( (err, status) => {
                if (status) {
                    console.log('listings flushed');
                    resolve();
                } else {
                    console.log('could not flush bucket', err);
                    reject();
                }
            })
        })
    },
    listings: (data) => {
        return new Promise ( (resolve, reject) => {
            for (var i = 0 ; i < data.length; i++){
                listingsBucket.insert(data[i].id, {
                    title: data[i].title,
                    owner_id: data[i].owner_id,
                    overall_rating_avg: data[i].overall_rating_avg,
                    communication_rating_avg: data[i].communication_rating_avg,
                    cleanliness_rating_avg: data[i].cleanliness_rating_avg,
                    check_in_rating_avg: data[i].check_in_rating_avg,
                    accuracy_rating_avg: data[i].accuracy_rating_avg,
                    location_rating_avg: data[i].location_rating_avg,
                    value_rating_avg: data[i].value_rating_avg,
                    quick_responses_total: data[i].quick_responses_total, 
                    sparkling_clean_total: data[i].sparkling_clean_total,
                    amazing_amenities_total: data[i].amazing_amenities_total,
                    stylish_total: data[i].stylish_total,
                    hospitality_total: data[i].hospitality_total
                }, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve();
                })
            }

        })
    },
    flushReviews: () => {
        return new Promise( (resolve, reject) => {
            reviewsManager.flush( (err, status) => {
                if (status) {
                    console.log('reviews flushed');
                    resolve();
                } else {
                    console.log('could not flush bucket', err);
                    reject();
                }
            })
        })
    },
    reviews: () => {
        reviewsBucket.insert('test1', {name: "blah blah"}, (err, res) => {
            if (err) {
                throw err;
            }
            reviewsBucket.get('test1', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.value)
            })
        })
    },
    flushOwnerResponses: () => {
        return new Promise( (resolve, reject) => {
            responsesManager.flush( (err, status) => {
                if (status) {
                    console.log('owners_responses flushed');
                    resolve();
                } else {
                    console.log('could not flush bucket', err);
                    reject();
                }
            })
        })
    },
    ownerResponses: (data) => {
        return new Promise ( (resolve, reject) => {
            for (var i = 0; i < data.length; i++) {
                ownerResponses.insert(data[i].id, {response: data[i].response, date: data[i].date}, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve();
                })
            }

        })
    },
}