var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    over12(collection);
    startingABC(collection);
    startEndVowels(collection);
    over6Vowels(collection);
    nonAlphaCharacters(collection);
    setTimeout(function(){myDB.close();}, 5000);
  });
});
function displayCursor(cursor, msg){
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    if (wordStr.length > 65){
      wordStr = wordStr.slice(0, 65) + "...";
    }
    console.log("\n" + msg + "\n" + wordStr);
  });
}
function over12(collection){
  var query = {'size': {'$gt': 12}};
  var cursor = collection.find(query);
  displayCursor(cursor, "Words with more than 12 characters:");
}
function startingABC(collection){
  var query =  {'first': {'$in': ["a","b","c"]}};
  var cursor = collection.find(query);
  displayCursor(cursor, "Words starting with A, B or C:");
}
function startEndVowels(collection){
  var query = {'$and': [
                {'first': {'$in': ["a","e","i","o","u"]}},
                {'last': {'$in': ["a","e","i","o","u"]}}]};
  var cursor = collection.find(query);
  displayCursor(cursor, "Words starting and ending with a vowel:");
}
function over6Vowels(collection){
  var query =  {'stats.vowels': {'$gt': 5}};
  var cursor = collection.find(query);
  displayCursor(cursor, "Words with more than 5 vowel:");
}
function nonAlphaCharacters(collection){
  var query = {'charsets': 
      {'$elemMatch': 
        {'$and': [
          {'type': 'other'},
          {'chars': {'$size': 1}}]}}};
  var cursor = collection.find(query);
  displayCursor(cursor, "Words with 1 non-alphabet characters:");
}