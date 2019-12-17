/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const Models = require('../server/models.js');

function users() {
  for (let i = 0; i < 3000; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    Models.users({ name: randomName, image: randomImage });
  }
}

function owners() {
  for (let i = 0; i < 100; i += 1) {
    const randomName = faker.name.firstName();
    const randomImage = faker.image.avatar();
    Models.owners({ name: randomName, image: randomImage });
  }
}

function listings() {
  for (let i = 1; i <= 100; i += 1) {
    const title = faker.lorem.words();
    const avg_rating = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const communication = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const check_in = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const location = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const accuracy = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const value = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const cleanliness = Math.floor(Math.random() * (5 * 100 - 3.5 * 100) + 3.5 * 100) / (1 * 100);
    const hospitality = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    const stylish = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    const sparkling_clean = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    const quick_responses = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    const amazing_amenities = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    const counts = Math.floor(Math.random() * (400 - 50 + 1) + 50);
    const owners_id = i;
    Models.listings({
      title,
      avg_rating,
      communication,
      check_in,
      accuracy,
      value,
      location,
      cleanliness,
      hospitality,
      stylish,
      sparkling_clean,
      quick_responses,
      amazing_amenities,
      counts,
      owners_id,
    });
  }
}

let reviewCounter = 0;

function reviews() {
  for (let i = 1; i <= 100; i += 1) {
    const randomReviewCount = Math.floor(Math.random() * (50 - 4 + 1) + 4);
    for (let j = 0; j < randomReviewCount; j += 1) {
      const date = faker.date.past();
      const review = faker.lorem.sentences();
      const users_id = Math.floor(Math.random() * (3000) + 1);
      const listings_id = i;
      Models.reviews({
        date,
        review,
        users_id,
        listings_id,
      });
      reviewCounter += 1;
    }
  }
}

function ownerResponses() {
  const responseCounts = reviewCounter / 5;
  for (let i = 0; i < responseCounts; i += 1) {
    const response = faker.lorem.sentences();
    const date = faker.date.past();
    const reviews_id = Math.floor(Math.random() * (reviewCounter) + 1);
    const owners_id = Math.floor(Math.random() * (100) + 1);
    Models.ownersResponses({
      response,
      date,
      reviews_id,
      owners_id,
    });
  }
}

users();
owners();
listings();
reviews();
ownerResponses();
