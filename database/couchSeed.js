
const Models = require('../server/couchModels.js');
const faker = require('faker');

const createUsers = async () => {
    await Models.flushUsers();
    Models.users();

    await Models.flushOwners();
    Models.owners();

    await Models.flushListings();
    Models.listings();

    await Models.flushReviews();
    Models.reviews();

    await Models.flushOwnerResponses();
    Models.ownerResponses();

}

createUsers();