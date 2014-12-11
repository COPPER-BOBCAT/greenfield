var cardController = require('./cardController');

module.exports = function(app) {
  app.post('/add', cardController.add);
};
