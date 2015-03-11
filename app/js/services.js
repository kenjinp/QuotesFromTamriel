"use strict";

QFT.factory('Quotes', ['$http', function PoemsFactory ($http) {
  return {
    random: function() {
      return $http.get('/api/random_quote');
    },
    all: function() {
      return $http.get('/api/quotes');
    },
    new: function(new_data) {
      return $http
        .post('/api/new_quote', JSON.stringify(new_data));
    },
    del: function(id) {
      return $http.get('/api/del_quote/'+ id);
    }
  }
}]);
