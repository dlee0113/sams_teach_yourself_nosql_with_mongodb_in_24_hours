var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    console.log("Before Save:");
    showWord(collection, saveBlueDoc);
  });
});
function showWord(collection, callback){
  var query = {'word': 'ocean'};
  collection.find(query, function(err, items){
    items.toArray(function(err, itemsArr){
      for (var i in itemsArr){
        console.log(itemsArr[i]);
      }
      callback(collection);
    });
  });
}
function saveBlueDoc(collection){
  var query = {'word' : "ocean"};
  collection.findOne(query, function(err, doc){
    doc["category"] = "blue";
    var options = {w:1, wtimeout:5000, journal:true, fsync:false};
    collection.save(doc, options, function(err, results){
      console.log("\nSave Docs Result:");
      console.log(results);
      console.log("\nAfter Saving Doc:");
      showWord(collection, resetDoc);
    });
  });
}
function resetDoc(collection){
  var query = {'word' : "ocean"};
  collection.findOne(query, function(err, doc){
    doc["category"] = "";
    var options = {w:1, wtimeout:5000, journal:true, fsync:false};
    collection.save(doc, options, function(err, results){
      console.log("\nReset Docs Result:");
      console.log(results);
      console.log("\nAfter Resetting Doc:");
      showWord(collection, closeDB);
    });
  });
}
function closeDB(collection){
  myDB.close();
}
