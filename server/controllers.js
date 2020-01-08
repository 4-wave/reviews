const Models = require('./queryModels.js');

module.exports = {
  getReview: (id, res) => {
    Models.getReview((err, data) => {
      if (err) {
        res.status(400).send(JSON.stringify(data.rows))
      } else {
        debugger
        res.status(200).send(JSON.stringify(data.rows))
      }
    }, id)
  },
  getReviews: (id, res) => {
    Models.getReviews((err, data) => {
      if (err) {
        res.status(400).send(JSON.stringify(data.rows));
      } else {
        res.status(200).send(JSON.stringify(data.rows));
      }
    }, id);
  },
  createReview: (data, res) => {
    Models.createReview((err, data) => {
      if (err) {
        res.status(400).send(JSON.stringify(data.rows))
      } else {
        res.status(200).send(JSON.stringify(data.rows))
      }
    }, data)
  },
  deleteReview: (id, res) => {
    Models.deleteReview((err, data) => {
      if (err) {
        console.log(err)
        res.status(400).send(JSON.stringify(data.rows))
      } else {
        res.status(200).send(JSON.stringify(data.rows))
      }
    }, id)
  },
  updateReview: (id, res) => {
    Models.updateReview((err, data) => {
      if (err) {
        console.log(err)
        res.status(400).send(JSON.stringify(data.rows))
      } else {
        res.status(200).send(JSON.stringify(data.rows))
      }
    })
  }
};
