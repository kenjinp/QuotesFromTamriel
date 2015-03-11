'use strict';

QFT.controller('ApplicationController', function (
  $rootScope,
  $scope,
  $location) {
});


QFT.controller("HomeCtrl", function (
  $scope,
  Quotes) {

  $scope.pageClass = 'page-home';

  $scope.title = 'Whatever This is!';

  $scope.quote = {};

  $scope.searchlink = '';

  Quotes.random()
  .success(function(data, status, headers, config) {
    $scope.quote = data;
    console.log(data);
    $scope.searchlink = 'http://uesp.net/w/index.php?search='+ data.author.replace(/[^a-zA-Z0-9]/g,'+');
  })
  .error(function(data, status, headers, config) {
    alert(data);
  });

});

QFT.controller("NewCtrl", function (
  $scope,
  Quotes,
  $location) {

  $scope.pageClass = 'page-new';

  $scope.new_quote = {};

  $scope.save = function(new_data) {
    Quotes.new(new_data)
    .success(function(data, status, headers, config) {
      console.log("new quote submitted");
      $location.path('#/home');
    })
    .error(function(data, status, headers, config) {
      $scope.new_quote = {};
      console.log('error');
    })
    .then(function (res) {
    });
  };

});

QFT.controller("QuotesCtrl", function (
  $scope,
  Quotes) {

  $scope.pageClass = 'page-quote';

  $scope.quotes = {};

  Quotes.all()
    .success(function(data, status, headers, config) {
      $scope.quotes = data;
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      alert(data);
    });

  $scope.del = function(id){
    Quotes.del(id)
    .success(function(data, status, headers, config) {
      console.log('deleted id: '+id+' res@'+data);
    })
    .error(function(data, status, headers, config) {
      alert(data);
    });
  }

});
