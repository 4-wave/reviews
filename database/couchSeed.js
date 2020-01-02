
const Models = require('../server/couchModels.js');
const faker = require('faker');

const batchSize = 10000;
const userSize = 10000000;

const createUsers = async () => {
    let number = 0;
    for (var j = 0; j < userSize/batchSize; j++) {
        let arr = [];
        for(var i = 0; i < batchSize; i++) {
            // Models.users({
            //     id: (i + number).toString(),
            //     name: faker.name.firstName(),
            //     image: faker.image.avatar()
            // })
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

const createData = async () => {
    await Models.flushUsers();
    createUsers();

    // await Models.flushOwners();
    // Models.owners();

    // await Models.flushListings();
    // Models.listings();

    // await Models.flushReviews();
    // Models.reviews();

    // await Models.flushOwnerResponses();
    // Models.ownerResponses();

}

createData();