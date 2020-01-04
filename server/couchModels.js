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

const ownerResponses = cluster.openBucket('owners_responses');
const responsesManager = ownerResponses.manager();

module.exports = {
    flushUsers: () => {
        let del = couchbase.N1qlQuery.fromString('DELETE FROM users');
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
        let del = couchbase.N1qlQuery.fromString('DELETE FROM owners');
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
    owners: () => {
        ownersBucket.insert('test2', {name: "blah blah"}, (err, res) => {
            if (err) {
                throw err;
            }
            ownersBucket.get('test2', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.value)
            })
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
    listings: () => {
        listingsBucket.insert('test1', {name: "blah blah"}, (err, res) => {
            if (err) {
                throw err;
            }
            listingsBucket.get('test1', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.value)
            })
        })
    },
    flushReviews: () => {
        let del = couchbase.N1qlQuery.fromString('DELETE FROM reviews');
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
    ownerResponses: () => {
        ownerResponses.insert('test1', {name: "blah blah"}, (err, res) => {
            if (err) {
                throw err;
            }
            ownerResponses.get('test1', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.value)
            })
        })
    },
}