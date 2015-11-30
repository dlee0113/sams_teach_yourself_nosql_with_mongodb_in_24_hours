var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    countWords(collection);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function countWords(collection){
  var allCursor = collection.find();
  allCursor.count(function(err, cnt){
    console.log("Total words in the collection:\n" + cnt);
  }); 
  var query = {first: 'a'};
  var aCursor = collection.find(query);
  aCursor.count(function(err, cnt){
    console.log("\nTotal words starting with A:\n" + cnt);
  });
}