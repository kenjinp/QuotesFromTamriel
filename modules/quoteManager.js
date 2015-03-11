var models = require('./models'),
    quote = models.quote;

exports.newQuote = function(newData, callback) {
    var newQuote = new quote(newData);
    newQuote.save(function (err, newQuote) {
      if (err) return callback(err);
      console.log(newQuote);
      callback(null, newQuote, 'new quote');
    });
}


exports.delQuote = function(newData, callback) {

}
