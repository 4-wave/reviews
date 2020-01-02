/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const Models = require('../server/models.js');

const batchSize =  500000;
const userNumber = 10000000;

const ownerNumber = 8000000;
const ownerResponseNumber = 7000000;
const listingNumber = 10000000;

const users = async () => {
  await Models.deleteUsers();
  var promises = [];
  var number = 0;
  for (var j = 0; j < (userNumber / batchSize); j++) {
    var arr = [];
    for (var i = 0; i < batchSize; i += 1) {
      var randomName = faker.name.firstName();
      var randomImage = faker.image.avatar();
      arr.push([randomName, randomImage])
    }
    await Models.users(arr);
    number = number + batchSize;
    arr = null;
  }
  console.log('finished users')
};

const owners = async () =>  {
  await Models.deleteOwners();
  let number = 0;
  for (var j = 0; j < (ownerNumber / batchSize); j++) {
    let arr = [];
    for (let i = 0; i < batchSize; i += 1) {
      const randomName = faker.name.firstName();
      const randomImage = faker.image.avatar();
      arr.push([randomName, randomImage])
    }
    await Models.owners( arr );
    number = number + batchSize;
    arr = null;
  }
  console.log("created owners")
}

const ownerResponses = async () => {
  await Models.deleteOwnerResponses();
  let number = 0;
  for (var j = 0; j < (ownerResponseNumber / batchSize); j++) {
    let arr = [];
    for (let i = 0; i < batchSize; i += 1) {
      const response = faker.lorem.sentences();
      const date = faker.date.past();
      arr.push([response, date])
    }
    await Models.ownerResponses( arr );
    arr = null
  }
  console.log('created owner responses')
}

const reviewsCount = async (averages, iterateAverages, totals, iterateTotals, currReview) => {
  iterateAverages.forEach((key) => {
    let num = Math.round(Math.random() * 3) + 2;
    averages[key] += num;
    currReview[key] = num;
  })

  iterateTotals.forEach((key) => {
    totals[key] += Math.round(Math.random());
    currReview[key] = Math.round(Math.random()) === 1;
  })
}

const listings = async () => {
  await Models.deleteListings();
  await Models.deleteReviews();
  let number = 0
  for (let k = 0; k < listingNumber/batchSize; k++) {
    let listingsArr = [];
    let reviewsArr = [];
    for (let i = 1 ; i < batchSize; i++) {
      let averages = {
        overall_rating: 0,
        communication_rating: 0,
        cleanliness_rating: 0,
        check_in_rating: 0,
        accuracy_rating: 0,
        value_rating: 0,
        location_rating: 0
      }
    
      let iterateAverages = Object.keys(averages)
    
      let totals = {
        quick_responses: 0,
        sparkling_clean: 0,
        amazing_amenities: 0,
        stylish: 0,
        hospitality: 0,
      }
    
      let iterateTotals = Object.keys(totals)

      let randomReviewCount = Math.floor(Math.random() * 5);
      
      for (let j = 0; j < randomReviewCount; j++) {
        let date = faker.date.past();
        let review = faker.lorem.sentences();
        let user_id = i + number;
        let listing_id = i + number;

        let currentReview = {}
        reviewsCount(averages, iterateAverages, totals, iterateTotals, currentReview)
        reviewsArr.push(
          [
            date,
            review,
            currentReview.overall_rating,
            currentReview.communication_rating,
            currentReview.cleanliness_rating,
            currentReview.check_in_rating,
            currentReview.accuracy_rating,
            currentReview.value_rating,
            currentReview.location_rating,
            currentReview.quick_responses,
            currentReview.sparkling_clean,
            currentReview.amazing_amenities,
            currentReview.stylish,
            currentReview.hospitality,
            user_id,
            listing_id
        ])
      }
      averageOverall = (averages.overall_rating / randomReviewCount);
      averageCommunication = (averages.communication_rating / randomReviewCount);
      averageCleanliness = (averages.cleanliness_rating / randomReviewCount);
      averageCheckIn = (averages.check_in_rating / randomReviewCount);
      averageAccuracy = (averages.accuracy_rating / randomReviewCount);
      averageValue = (averages.value_rating / randomReviewCount);
      averageLocation = (averages.location_rating / randomReviewCount);
      listingsArr.push([
        faker.lorem.words(), 
        Math.floor(Math.random() * ownerNumber) + 1,
        averageOverall,
        averageCommunication,
        averageCleanliness,
        averageCheckIn,
        averageAccuracy,
        averageValue,
        averageLocation,
        totals.quick_response,
        totals.sparkling_clean,
        totals.amazing_amenities,
        totals.stylish,
        totals.hospitality
      ])
    }
    console.log(k)
    await Models.listings(listingsArr)
    await Models.reviews(reviewsArr)
  }
}

const createData = async () => {
  let t0 = Date.now()
  await users();
  let t1 = Date.now()
  console.log('users in ' + (t1-t0) + 'ms');

  t0 = Date.now()
  await owners();
  t1 = Date.now()
  console.log('owners in ' + (t1-t0) + 'ms');

  t0 = Date.now()
  await ownerResponses();
  t1 = Date.now()
  console.log('owner responses in ' + (t1-t0) + 'ms');

  t0 = Date.now()
  await listings();
  t1 = Date.now()
  console.log('reviews and listings in ' + (t1-t0) + 'ms');
}

createData()