/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const Models = require('../server/models.js');

const userNumber = 100;
const ownerNumber = 80;
const ownerResponseNumber = 20;
const listingNumber = 2;
const users = async () => {
  await Models.deleteUsers();
  for (let i = 0; i < userNumber; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    await Models.users({ name: randomName, image: randomImage }, idx = i);
  }
  // Models.db.end();
};

const owners = async () =>  {
  await Models.deleteOwners();
  for (let i = 0; i < ownerNumber; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    await Models.owners({ name: randomName, image: randomImage }, idx = i);
  }
}

// const reviews = () => {
//   Models.deleteReviews()
//   const randomReviewCount = Math.floor(Math.random() * 8) + 8;
//   console.log("creating " + randomReviewCount + " reviews");
//   for (let j = 0; j < randomReviewCount; j += 1) {
//     const date = faker.date.past();
//     const review = faker.lorem.sentences();
//     const overall_rating = Math.floor(Math.random() * 5);
//     const cleanliness_rating = Math.floor(Math.random() * 5);
//     const check_in_rating = Math.floor(Math.random() * 5);
//     const accuracy_rating = Math.floor(Math.random() * 5);
//     const value_rating = Math.floor(Math.random() * 5);
//     const location_rating = Math.floor(Math.random() * 5);
//     const quick_responses = Math.round(Math.random()) === 1 ? true : false;
//     const sparkling_clean = Math.round(Math.random()) === 1 ? true : false;
//     const amazing_amenities = Math.round(Math.random()) === 1 ? true : false;
//     const stylish = Math.round(Math.random()) === 1 ? true : false;
//     const hospitality = Math.round(Math.random()) === 1 ? true : false;
//     Models.reviews({
//       date,
//       review,
//       overall_rating,
//       cleanliness_rating,
//       check_in_rating,
//       accuracy_rating,
//       value_rating,
//       location_rating,
//       quick_responses,
//       sparkling_clean,
//       amazing_amenities,
//       stylish,
//       hospitality
//     });
//   }
// }

const ownerResponses = async () => {
  await Models.deleteOwnerResponses();
  for (let i = 0; i < ownerResponseNumber; i += 1) {
    const response = faker.lorem.sentences();
    const date = faker.date.past();
    await Models.ownersResponses({
      response,
      date
    });
  }
}

const createData = async () => {
  await Models.deleteReviews();
  await Models.deleteListings();

  // create listing
  for (let i = 0; i < listingNumber; i++) {
    await Models.listings({
      title: faker.lorem.words(),
      owners_id: Math.floor(Math.random() * ownerNumber)
    })

    const totalOverall = 0;
    const totalCleanliness = 0;
    const totalCheckIn = 0;
    const totalAccuracy = 0;
    const totalValue = 0;
    const totalLocation = 0;

    const totalQuick = 0;
    const totalSparkling = 0;
    const totalAmazing = 0;
    const totalStylish = 0;
    const totalHospitality = 0;

    const randomReviewCount = Math.floor(Math.random() * 8) + 8;
    console.log("creating " + randomReviewCount + " reviews");
    for (let j = 0; j < randomReviewCount; j += 1) {
      const date = faker.date.past();
      const review = faker.lorem.sentences();

      const overall_rating = Math.floor(Math.random() * 5);
      totalOverall += overall_rating;
      const cleanliness_rating = Math.floor(Math.random() * 5);
      totalCleanliness += cleanliness_rating;
      const check_in_rating = Math.floor(Math.random() * 5);
      totalCheckIn += check_in_rating
      const accuracy_rating = Math.floor(Math.random() * 5);
      totalAccuracy += accuracy_rating;
      const value_rating = Math.floor(Math.random() * 5);
      totalValue += value_rating;
      const location_rating = Math.floor(Math.random() * 5);
      totalLocation += location_rating;

      const quick_responses = Math.round(Math.random())
      totalQuick += quick_responses;
      const sparkling_clean = Math.round(Math.random())
      totalSparkling += sparkling_clean; 
      const amazing_amenities = Math.round(Math.random())
      totalAmazing += amazing_amenities;
      const stylish = Math.round(Math.random())
      totalStylish += stylish;
      const hospitality = Math.round(Math.random())
      totalHospitality += hospitality;

      const user_id = Math.floor(Math.random() * userNumber);
      const listing_id = i;

      await Models.reviews({
        date,
        review,
        overall_rating,
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
    totalCleanliness = (totalCleanliness / randomReviewCount);
    totalCheckIn = (totalCheckIn / randomReviewCount);
    totalAccuracy = (totalAccuracy / randomReviewCount);
    totalValue = (totalValue / randomReviewCount);
    totalLocation = (totalLocation / randomReviewCount);
    await Models.updateListing({
      totalOverall,
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
    }, i)
  }
}

users();
owners();
ownerResponses();

createData();
// reviews();
// listings();
