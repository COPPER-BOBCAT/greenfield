Stripe.setPublishableKey("pk_test_d4qfvAGCTfij33GxuvYkZKUl");

angular.module('pledgr.creditcard', [])

.controller('CreditCardController', function($scope, $http) {
  $scope.addCard = function() {
     var $form = $('#payment-form');

     Stripe.card.createToken($form, 
        function (status, response) {
          if (response.error) {
            $form.find('.payment-errors').text(response.error.message);
            // $form.find('button').prop('disabled', false);

          } else {
            // response contains id and card, which contains additional card details
            var token = response.id;
            $http({
              url: '/card/add',
              method: "POST",
              data: {user: 'someone@example.com', stripeToken: token},
              headers: {'Content-Type': 'application/json'}
            })
            .then(function (data) {
                console.log("SUCCESS!");
            });

            $form.get(0).reset();
          }
        }
     ); 
  }

});
