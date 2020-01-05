
const Models = require('../server/couchModels.js');
const faker = require('faker');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const batchSize = 10000;
const userSize = 10000000;

const ownerNumber = 8000000;
const ownerResponseNumber = 7000000;
const listingNumber = 1000000;

const createUsers = async () => {
    let number = 0;
    for (var j = 0; j < userSize/batchSize; j++) {
        let arr = [];
        for(var i = 0; i < batchSize; i++) {
            arr.push({
                    id: (i + number).toString(),
                    name: faker.name.firstName(),
                    image: faker.image.avatar()
            });
        }
        await Models.users(arr);
        number = number + batchSize;
        console.log(number)
    }
}
const createOwners = async () => {
    let number = 0;
    for (var j = 0; j < ownerNumber/batchSize; j++) {
        let arr = [];
        for(var i = 0; i < batchSize; i++) {
            arr.push({
                    id: (i + number).toString(),
                    name: faker.name.firstName(),
                    image: faker.image.avatar()
            });
        }
        await Models.owners(arr);
        number = number + batchSize;
        console.log(number)
    }
}

const createListings = async () => {
    let number = 0;

        let arr = [];
        fs.createReadStream(path.resolve(__dirname, `../csvs/listings/listings9.csv`))
            .pipe(csv())
            .on('data', async (row) => {
                arr.push({
                    id: (9000000 + number++).toString(),
                    title: row['title'],
                    owner_id: row[' owner_id'],
                    overall_rating_avg: row[' overall_rating_avg'],
                    communication_rating_avg: row[' communication_rating_avg'],
                    cleanliness_rating_avg: row[' cleanliness_rating_avg'],
                    check_in_rating_avg: row[' check_in_rating_avg'],
                    accuracy_rating_avg: row[' accuracy_rating_avg'], 
                    location_rating_avg: row[' location_rating_avg'], 
                    value_rating_avg: row[' value_rating_avg'],
                    quick_responses_total: row[' quick_responses_total'],
                    sparkling_clean_total: row[' sparkling_clean_total'],
                    amazing_amenities_total: row[' amazing_amenities_total'],
                    stylish_total: row[' stylish_total'],
                    hospitality_total: row[' hospitality_total']
                })
            })
            .on('end', async () => {
                await Models.listings(arr)
                console.log('done')
                number = number + batchSize;
                console.log(number)
            })
}

const createReviews = async () => {
    let number = 0;

    for(var i = 0; i < 10; i++) {
        let arr = []
        fs.createReadStream(path.resolve(__dirname, `../csvs/reviews/reviews${i}.csv`))
            .pipe(csv())
            .on('data', async (row) => {

            })
            .on('end', async () => {
                await Models.reviews(arr)
                number = number + batchSize;
                console.log(number)
            })

    }
}

const createOwnerResponses = async () => {
    let number = 0;
    for (var j = 0; j < ownerResponseNumber/batchSize; j++) {
        let arr = [];
        for(var i = 0; i < batchSize; i++) {
            arr.push({
                    id: (i + number).toString(),
                    response: faker.lorem.sentences(),
                    date: faker.date.past()
            });
        }
        await Models.ownerResponses(arr);
        number = number + batchSize;
        console.log(number)
    }
}

const createData = async () => {
    // await Models.flushUsers();
    // await Models.flushOwners();
    // await Models.flushOwnerResponses();
    // await Models.flushListings();
    // await Models.flushReviews();
    // createUsers();
    // createOwners();
    // createOwnerResponses();
    createListings();
    // createReviews();

}

createData();