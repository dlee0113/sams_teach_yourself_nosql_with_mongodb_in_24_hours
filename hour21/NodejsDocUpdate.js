var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    console.log("Before Updating:");
    showWord(collection, updateDoc);
  });
});
function showWord(collection, callback){
  var query = {'word': {'$in' : ['left', 'lefty']}};
  collection.find(query, function(err, items){
    items.toArray(function(err, itemsArr){
      for (var i in itemsArr){
        console.log(itemsArr[i]);
      }
      callback(collection);
    });
  });
}
function updateDoc(collection){
  var query = {'word' : "left"};
  var update = {
      '$set' : {'word' : 'lefty'},
      '$inc' : {'size' : 1, 'stats.consonants' : 1},
      '$push' : {'letters' : 'y'}};
  var options = {w:1, wtimeout:5000, journal:true, fsync:false, 
                 upsert:false, multi:false};
  collection.update(query, update, options, function(err, results){
    console.log("\nUpdating Doc Results:");
    console.log(results);
    console.log("\nAfter Updating Doc:");
    showWord(collection, resetDoc);
  });
}
function resetDoc(collection){
  var query = {'word' : "lefty"};
  var update = {
      '$set' : {'word' : 'left'},
      '$inc' : {'size' : -1, 'stats.consonants' : -1},
      '$pop' : {'letters' : 1}};
  var options = {w:1, wtimeout:5000, journal:true, fsync:false, 
      upsert:false, multi:false};
  collection.update(query, update, options, function(err, results){
    console.log("\nReset Doc Results:");
    console.log(results);
    console.log("\nAfter Resetting Doc:");
    showWord(collection, closeDB);
  });
}
function closeDB(collection){
  myDB.close();
}
