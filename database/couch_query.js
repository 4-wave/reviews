const couchbase = require('couchbase')

const cluster = new couchbase.Cluster('couchbase://127.0.0.1:8091//');
cluster.authenticate('Administrator', 'password');

const usersBucket = cluster.openBucket('users');


let q = couchbase.N1qlQuery.fromString(`SELECT * FROM users WHERE META(users).id = "12345"`);
console.log('query to select user with id 12345');
let t0 = Date.now();
    usersBucket.query(q, (err, rows) => {
    if (err) {
        throw err
    } else {
        console.log("success")
        console.log("Time: " + (Date.now() - t0) + " ms");
        console.log(rows)
    }
})

