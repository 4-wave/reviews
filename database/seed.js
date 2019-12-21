/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const Models = require('../server/models.js');

const userNumber = 1000;
const ownerNumber = 500;
const ownerResponseNumber = 200;
const listingNumber = 10000;
const users = async () => {
  Models.deleteUsers();
  for (let i = 0; i < userNumber; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    Models.users({ name: randomName, image: randomImage }, idx = i);
  }
  // Models.db.end();
};

const owners = async () =>  {
  Models.deleteOwners();
  for (let i = 0; i < ownerNumber; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    Models.owners({ name: randomName, image: randomImage }, idx = i);
  }
}

const ownerResponses = async () => {
  Models.deleteOwnerResponses();
  for (let i = 0; i < ownerResponseNumber; i += 1) {
    const response = faker.lorem.sentences();
    const date = faker.date.past();
    Models.ownersResponses({
      response,
      date
    });
  }
}

const createData = async () => {
  users();
  owners();
  ownerResponses();
  Models.deleteReviews();
  Models.deleteListings();

  // create listing
  for (let i = 0; i < listingNumber; i++) {
    Models.listings({
      title: faker.lorem.words(),
      owners_id: Math.floor(Math.random() * ownerNumber)
    })

    let totalOverall = 0;

    let totalCommunication = 0;
    let totalCleanliness = 0;
    let totalCheckIn = 0;
    let totalAccuracy = 0;
    let totalValue = 0;
    let totalLocation = 0;

    let totalQuick = 0;
    let totalSparkling = 0;
    let totalAmazing = 0;
    let totalStylish = 0;
    let totalHospitality = 0;

    let randomReviewCount = Math.floor(Math.random() * 8) + 8;
    console.log("creating " + randomReviewCount + " reviews");
    for (let j = 0; j < randomReviewCount; j += 1) {
      let date = faker.date.past();
      let review = faker.lorem.sentences();

      // refactor this crap
      let overall_rating = Math.floor(Math.random() * 5);
      totalOverall += overall_rating;

      let communication_rating = Math.floor(Math.random() * 5);
      totalCommunication += communication_rating;
      let cleanliness_rating = Math.floor(Math.random() * 5);
      totalCleanliness += cleanliness_rating;
      let check_in_rating = Math.floor(Math.random() * 5);
      totalCheckIn += check_in_rating
      let accuracy_rating = Math.floor(Math.random() * 5);
      totalAccuracy += accuracy_rating;
      let value_rating = Math.floor(Math.random() * 5);
      totalValue += value_rating;
      let location_rating = Math.floor(Math.random() * 5);
      totalLocation += location_rating;

      let quick_responses = Math.round(Math.random())
      totalQuick += quick_responses;
      let sparkling_clean = Math.round(Math.random())
      totalSparkling += sparkling_clean; 
      let amazing_amenities = Math.round(Math.random())
      totalAmazing += amazing_amenities;
      let stylish = Math.round(Math.random())
      totalStylish += stylish;
      let hospitality = Math.round(Math.random())
      totalHospitality += hospitality;

      let user_id = Math.floor(Math.random() * userNumber);
      let listing_id = i;

      Models.reviews({
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
      });
    }
    totalOverall = (totalOverall / randomReviewCount);
    totalCommunication = (totalCommunication / randomReviewCount);
    totalCleanliness = (totalCleanliness / randomReviewCount);
    totalCheckIn = (totalCheckIn / randomReviewCount);
    totalAccuracy = (totalAccuracy / randomReviewCount);
    totalValue = (totalValue / randomReviewCount);
    totalLocation = (totalLocation / randomReviewCount);
    Models.updateListing({
      totalOverall,
      totalCommunication,
      totalCleanliness,
      totalCheckIn,
      totalAccuracy,
      totalValue,
      totalLocation,
      totalQuick,
      totalSparkling,
      totalAmazing,
      totalStylish,
      totalHospitality
    }, i + 1)
  }
}

createData();