//DATABASE  - PUT in Models folder and use an ENV file
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var grocerySchema = new Schema({
  date: Date,
  amount: {
    type: Number,
    min: [0, 'Too Few'],
    max: [200, 'Too Much'],
    required: [true, "Must have a value"]
  },
  transactionType: {
    type: String,
    enum: ['Groceries', 'Farmers Market']
  }
});

module.exports = mongoose.model('groceryModel', grocerySchema);

