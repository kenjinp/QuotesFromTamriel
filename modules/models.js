var mongoose = require('mongoose'),
    random = require('mongoose-simple-random');

//schema
var quoteSchema = mongoose.Schema({
    quote: { type: String },
    author: { type: String, default: 'Anonymous' },
    source: { type: String, default: 'Unknown' },
    updated : { type: Date, default: Date.now }
});

//midware to allow random sampling
quoteSchema.plugin(random);

//export
var Quote = mongoose.model('Quote', quoteSchema);
module.exports.quotes = Quote;
