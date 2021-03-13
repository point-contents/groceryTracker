var mongoose = require('mongoose');

//Set up default mongoose connection

mongoose.connect(process.env.MODELURL, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => console.log(error));

//Get the default connection
var db = mongoose.connection;

var Schema = mongoose.Schema;
var workTransactionModel = new Schema({
  date: Date,
  amount: {
    type: Number,
    min: [0, 'Too Few'],
    max: [200, 'Too Much'],
    required: [true, "Must have a value"]
  },
  transactionType: {
    type: String,
    enum: ['Work Lunches']
  }
});

module.exports = mongoose.model('workTransactionModel', workTransactionModel);
