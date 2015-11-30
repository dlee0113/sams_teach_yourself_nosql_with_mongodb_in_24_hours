var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
mongo.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    collection.count(function(err, count){
      console.log("Number of Items: ");
      console.log(count);
      myDB.close();
    });
  });
});