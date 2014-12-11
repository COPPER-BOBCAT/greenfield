var helpers = require('../config/helpers');
var Card = require('./cardModel');
var stripe = require('stripe')("sk_test_WjBhk0wLLvaJp3bO65bozL53");

module.exports = {
  add: function(req, res) {
    var stripeToken = req.body.stripeToken;

    //find customer ID through email
    // stripe.customers.retrieve("Customer ID", function(err, customer) {
    //   if(err) {
  	    //if customer ID does not exist, then create a new customer
  	    stripe.customers.create(
  	    	{
  	      	// card: stripeToken,
  	      	description: 'someone@example.com'
  	    	}, 
  	    	function(err, customer) {
  	    		if(err) {
  	    			res.send('failed to create customer!');
  	    		}
  	    		console.log("CUSTOMER = ", customer);
	  				stripe.customers.createCard(customer.id, {card: stripeToken},
	  				  function(err, card) {
	  				  	if(err) {
	  				  		console.log('ERROR', err);
	  				  	}
	  				    if(!err) {   	
	  				    	console.log('CARD IS', card);
				  	      return stripe.charges.create({
				  	        amount: 1000,
				  	        currency: "usd",
				  	        customer: customer.id
				  	      }, 
				  	      function(err, charge) {
  	        	    	console.log('CHARGE IS', charge);

  	        	    	var card = new Card({user: req.body.user, customer_id: customer.id});
  	        	    	console.log('CARD IS', card);
  	            		card.save(function(error) {
  	            			console.log("made it in here!!!");
  	              		if (!error) {
  	              			res.send('SUCCESS');
  	              		}
  	            		});
				  	      });
	  				    }
	  				});
  	    });
      }
      // else {
      // 	//customer does exist
      // 	//create a new card
      // 	stripe.customers.createCard("Customer ID", {card: stripeToken},
      // 	  function(err, card) {
      	    
      // 	});
      // }
  //   });
    
  // }
};
