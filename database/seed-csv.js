const faker = require('faker');
const Models = require('../server/models.js');

const fs = require('fs');

const batchSize =  1000000;
const userNumber = 10000000;

const ownerNumber = 8000000;
const ownerResponseNumber = 7000000;
const listingNumber = 10000000;

const encoding = 'utf-8';

const users = async () => {
    return new Promise( (resolve, reject) => {
        let number = 0
        for (var i = 0; i < (userNumber/batchSize); i++) {
            let str = '';
            const usersFile = fs.createWriteStream(`csvs/users/users${i}.csv`);
            usersFile.write('name, image\n', encoding);
            for (var j = 0; j < batchSize; j++) {
                var randomName = faker.name.firstName();
                var randomImage = faker.image.avatar();
                str += `${randomName}, ${randomImage}\n`;
            }
            usersFile.write(str, encoding);
            number = number + batchSize
            console.log(number)
        }
        resolve();
    })
}

const owners = async () => {

    return new Promise((resolve, reject) => {
        let number = 0;
        for (var j = 0; j < (ownerNumber / batchSize); j++) {
            let str = '';
            const usersFile = fs.createWriteStream(`csvs/owners/owners${j}.csv`);
            usersFile.write('name, image\n', encoding);
            for (let i = 0; i < batchSize; i += 1) {
              const randomName = faker.name.firstName();
              const randomImage = faker.image.avatar();
              str += `${randomName}, ${randomImage}\n`;
            }
            usersFile.write(str, encoding);
            number = number + batchSize;
            console.log(number)
          }
          resolve()
    })
}

const ownerResponses = async () => {

    return new Promise((resolve, reject) => {
        let number = 0;
        for (var j = 0; j < (ownerResponseNumber / batchSize); j++) {
            let str = '';
            const usersFile = fs.createWriteStream(`csvs/owner_responses/owner_responses${j}.csv`);
            usersFile.write('response, date\n', encoding);
            for (let i = 0; i < batchSize; i += 1) {
              const response = faker.lorem.sentences();
              const date = faker.date.past();
              str += `${response}, ${date}\n`;
            }
            usersFile.write(str, encoding);
            number = number + batchSize;
            console.log(number)
          }
          resolve()
    })
}
const reviewsCount = async (averages, iterateAverages, totals, iterateTotals, currReview) => {
    iterateAverages.forEach((key) => {
      let num = Math.round(Math.random() * 3) + 2;
      averages[key] += num;
      currReview[key] = num;
    })
  
    iterateTotals.forEach((key) => {
      let val = Math.round(Math.random());
      totals[key] += val
      currReview[key] = (val === 1);
    })
  }

const listings = async () => {

    return new Promise ((resolve, reject) => {
        let number = 0;
        let review_id = 0;
        for (let k = 0; k < (listingNumber/batchSize); k++) {
            let reviewsStr = '';
            let userReviewsStr = '';

            const userReviewsFile = fs.createWriteStream(`csvs/user_reviews/user_reviews${k}.csv`);
            userReviewsFile.write('user_id, listing_id, review_id, owner_id\n', encoding);

            const reviewsFile = fs.createWriteStream(`csvs/reviews/reviews${k}.csv`);
            reviewsFile.write('date, review, overall_rating, communication_rating, cleanliness_rating, check_in_rating, accuracy_rating, location_rating, value_rating, quick_responses, sparkling_clean, amazing_amenities, stylish, hospitality, user_id, listing_id\n', encoding);

            let listingsStr = '';
            const listingsFile = fs.createWriteStream(`csvs/listings/listings${k}.csv`);
            listingsFile.write('title, owner_id, overall_rating_avg, communication_rating_avg, cleanliness_rating_avg, check_in_rating_avg, accuracy_rating_avg, location_rating_avg, value_rating_avg, quick_responses_total, sparkling_clean_total, amazing_amenities_total, stylish_total, hospitality_total\n', encoding);
            for (let i = 0 ; i < batchSize; i++) {
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
              let iterateTotals = Object.keys(totals);
        
              let randomReviewCount = Math.floor(Math.random() * 5) + 1;
              let owner_id = Math.floor(Math.random() * (ownerNumber - 1)) + 1;
              
              for (let j = 0; j < randomReviewCount; j++) {
                let date = faker.date.past();
                let review = faker.lorem.sentences();
                let user_id = Math.floor(Math.random() * (userNumber - 1)) + 1;
                let listing_id = (i+1) + number;

                let currentReview = {}
                reviewsCount(averages, iterateAverages, totals, iterateTotals, currentReview)
                reviewsStr += `${date},${review},${currentReview.overall_rating},${currentReview.communication_rating},${currentReview.cleanliness_rating},${currentReview.check_in_rating},${currentReview.accuracy_rating},${currentReview.location_rating},${currentReview.value_rating},${currentReview.quick_responses},${currentReview.sparkling_clean},${currentReview.amazing_amenities},${currentReview.stylish},${currentReview.hospitality},${user_id},${listing_id}\n`
                userReviewsStr += `${user_id}, ${listing_id}, ${review_id}, ${owner_id}\n`
                review_id++;
              }

              if (randomReviewCount !== 0) {
                averageOverall = (averages.overall_rating / randomReviewCount);
                averageCommunication = (averages.communication_rating / randomReviewCount);
                averageCleanliness = (averages.cleanliness_rating / randomReviewCount);
                averageCheckIn = (averages.check_in_rating / randomReviewCount);
                averageAccuracy = (averages.accuracy_rating / randomReviewCount);
                averageValue = (averages.value_rating / randomReviewCount);
                averageLocation = (averages.location_rating / randomReviewCount);
              } else {
                averageOverall = 0;
                averageCommunication = 0;
                averageCleanliness = 0;
                averageCheckIn = 0;
                averageAccuracy = 0;
                averageValue = 0;
                averageLocation = 0;

              }
              listingsStr += `${faker.lorem.words()},${owner_id},${averageOverall},${averageCommunication},${averageCleanliness},${averageCheckIn},${averageAccuracy},${averageValue},${averageLocation},${totals.quick_responses},${totals.sparkling_clean},${totals.amazing_amenities},${totals.stylish},${totals.hospitality}\n`
            }
            reviewsFile.write(reviewsStr, encoding)
            listingsFile.write(listingsStr, encoding)
            userReviewsFile.write(userReviewsStr, encoding)
            number = number + batchSize;
            console.log(number)
        }
        resolve();
    })
}


users().then(() => {
    console.log('done with users, starting owners')
    owners().then(() => {
        console.log("finished with owners, starting owner_responses")
        ownerResponses().then(() => {
            console.log('finished with owner_responses, beginning reviews and listings')
            listings().then(() => {
                console.log('finished with csvs')
            })
        })
    })
});