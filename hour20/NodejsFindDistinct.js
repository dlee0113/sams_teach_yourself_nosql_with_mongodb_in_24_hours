var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    sizesOfAllWords(collection);
    sizesOfQWords(collection);
    firstLetterOfLongWords(collection);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function sizesOfAllWords(collection){
  collection.distinct("size", function(err, results){
    console.log("\nDistinct Sizes of words: \n" + results);
  });
}
function sizesOfQWords(collection){
  var query = {'first': 'q'};
  collection.distinct("size", query, function(err, results){
    console.log("\nDistinct Sizes of words starting with Q: \n" + 
                results);
  });
}
function firstLetterOfLongWords(collection){
  var query = {'size': {'$gt': 12}};
  collection.distinct("first", query, function(err, results){
    console.log("\nDistinct first letters of words longer than" + 
                "  12 characters: \n" + results);
  });
}
