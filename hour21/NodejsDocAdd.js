var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    console.log("Before Inserting:");
    showDocs(collection, addSelfie);
  });
});
function showDocs(collection, callback){
  var query = {'category': 'New'};
  collection.find(query, function(err, items){
    items.toArray(function(err, itemsArr){
      for (var i in itemsArr){
        console.log(itemsArr[i]);
      }
      callback(collection);
    });
  });
}
function addSelfie(collection){
  var selfie = {
    word: 'selfie', first: 's', last: 'e',
    size: 4, letters: ['s','e','l','f','i'],
    stats: {vowels: 3, consonants: 3},
    charsets: [ {type: 'consonants', chars: ['s','l','f']},
                {type: 'vowels', chars: ['e','i']} ],
    category: 'New' };
  var options = {w:1, wtimeout:5000, journal:true, fsync:false};
  collection.insert(selfie, options, function(err, results){
    console.log("\nInserting One Results:\n");
    console.log(results);
    console.log("\nAfter Inserting One:");
    showDocs(collection, addGoogleAndTweet);
  });
}
function addGoogleAndTweet(collection){
  var tweet = {
      word: 'tweet', first: 't', last: 't',
      size: 4, letters: ['t','w','e'],
      stats: {vowels: 2, consonants: 3},
      charsets: [ {type: 'consonants', chars: ['t','w']},
                  {type: 'vowels', chars: ['e']} ],
      category: 'New' };
  var google = {
      word: 'google', first: 'g', last: 'e',
      size: 4, letters: ['g','o','l','e'],
      stats: {vowels: 3, consonants: 3},
      charsets : [ {type: 'consonants', chars: ['g','l']},
                   {type: 'vowels', chars: ['o','e']} ],
      category: 'New' };
  var options = {w:1, wtimeout:5000, journal:true, fsync:false};
  collection.insert([google, tweet], options, function(err, results){
    console.log("\nInserting Multiple Results:\n");
    console.log(results);
    console.log("\nAfter Inserting Multiple:");
    showDocs(collection, closeDB);
  });
}
function closeDB(collection){
  //collection.remove({'category': 'New'}, function(err, results){
    myDB.close();
  //});
}
