import { MongoClient } from 'mongodb';

const URI = "mongodb+srv://year-3-dev-2021:year3dev@conference-api.hfqud.mongodb.net/conference_db?retryWrites=true&w=majority";
let database;

module.exports = {
  connectToDatabseServer: function(callback) {
    MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
      database = client.db('conference_db');
      return callback(error);
    });
  },

  getDatabase: function() {
    return database;
  }
}