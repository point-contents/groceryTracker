//DATABASE  - PUT in Models folder and use an ENV file
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://asdf:2tzBxKnGx444ViN@tracker.spiyf.mongodb.net/groceryModel?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => console.log(error));

//Get the default connection
var db = mongoose.connection;

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

