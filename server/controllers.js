const Models = require('./models.js');

module.exports = {
  getListing: (id, res) => {
    Models.getListing((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, id);
  },
};
