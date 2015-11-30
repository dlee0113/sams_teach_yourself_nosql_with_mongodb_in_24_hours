var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    console.log("Before Deleting:");
    showDocs(collection, removeNewDocs);
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
function removeNewDocs(collection){
  var options = {w:1, wtimeout:5000, journal:true, fsync:false};
  collection.remove({'category': 'New'}, options, function(err, results){
    console.log("Delete Docs Result:");
    console.log(results);
    console.log("\nAfter Deleting:");
    showDocs(collection, closeDB);
  });
}
function closeDB(collection){
  myDB.close();
}