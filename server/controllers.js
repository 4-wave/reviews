const Models = require('./models.js');

module.exports = {
  getListing: (id, res) => {
    Models.getListing((err, data) => {
      if (err) {
        res.status(400).send(JSON.stringify(data.rows));
      } else {
        res.status(200).send(JSON.stringify(data.rows));
      }
    }, id);
  },
};
