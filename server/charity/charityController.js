var Charity = require('./charityModel');
var helpers = require('../config/helpers');

module.exports = {
  fetch: function(req, res) {
    var urlParts = req.url.split('/');
    var orgid = parseInt(urlParts[1], 10);

    Charity.findOne(
      {
        orgid: orgid
      },
      {},
      function(error, entry) {
        if (error) {
          helpers.errorHandler(error, req, res);
        } else {
          res.status(200).send(entry);
        }
      }
    );
  },

  register: function(req, res) {
    var charity = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
      category: req.body.category,
      subCategory: req.body.subCategory
    };
    var newCharity = new Charity(charity);
    newCharity.save(function(error) {
      if (error) {
        console.log(error);
      } else {
        res.send();
      }
    });
  },

  sendCategories: function(req, res) {
    res.send();
  },

  sendSubCategories: function(req, res) {
    res.send();
  }

};
