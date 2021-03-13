//DATABASE  - PUT in Models folder and use an ENV file
var mongoose = require('mongoose');

//Set up default mongoose connection

mongoose.connect(process.env.MODELURL, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => console.log(error));

//Get the default connection
var db = mongoose.connection;

var Schema = mongoose.Schema;
var miscSchema = new Schema({
  date: Date,
  amount: {
    type: Number,
    min: [0, 'Too Few'],
    max: [50, 'Too Much'],
    required: [true, "Must have a value"]
  },
  transactionType: {
    type: String,
    enum: ['Misc Spending']
  }
});

module.exports = mongoose.model('miscSchema', miscSchema);

